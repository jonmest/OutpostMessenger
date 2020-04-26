const { getOutpost, saveMessage, getMessages, getConnected, setConnected, removeConnected } = require('../db_interface')


const socketAuthentication = (socket, db, next) => {
    /*
    * Generate a random token and temporary keypair (for the host)
    */
    const token = nacl.randomBytes(10)
    const { publicKey, secretKey } = nacl.box.keyPair()

    /*
    * Send token and our public key
    * in base64 to ensure integrity
    */
    const authRequestObject = { 
        token: Buffer.from(token).toString('base64'),
        publicKey: Buffer.from(publicKey).toString('base64')
    }

    /*
    * Ask the client to authenticate, and we send
    * them the data needed for them and us to
    * verify their identity
    */
    socket.emit('Authentication request', authRequestObject)

    /*
    * When client responds to request.
    * They should send the signed/encrypted token,
    * the nonce to verify/encrypt it and their id
    */
    socket.on('Authentication response', async ({ signedToken, nonce, id }) => {
        // This is whom they claim to be
        const supposedClient = await getOutpost(id, db)

        // We'll try to decrypt the token they sent back
        const authenticatedToken = nacl.box.open(
            Buffer.from(signedToken, 'base64'),
            Buffer.from(nonce, 'base64'),
            Buffer.from(supposedClient.publicKey, 'base64'),
            secretKey
        )

        /*
        * If authenticatedToken is NULL, we're
        * dealing with someone who's not whom they
        * claim to be.
        * 
        * We'll also ensure the decrypted string is
        * the same as our original token for good 
        * measure.
        */
        if (
            authenticatedToken.toString('base64') === token.toString('base64') ||
            authenticatedToken === null
            ) {
            socket.emit('Authentication success')
            setConnected(socket.conn.id, id, db)
            .then(data => console.log(data))


            const waitingMessages = await getMessages(id, db)
            ioSocket.to(socket.conn.id).emit('oldMessages', waitingMessages)

            // Call callback function
            next(id, socket.conn.id)
        }    
    })
}

const wrapSocketToServer = http => {
    return io(http, {  

        handlePreflightRequest: (req, res) => {
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": '*', //or the specific origin you want to give access to,
                "Access-Control-Allow-Credentials": true
            }
            res.writeHead(200, headers)
            res.end()
        }})
}


module.exports = {
    socketAuthentication,
    wrapSocketToServer
}