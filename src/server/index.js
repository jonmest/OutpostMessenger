const app = require('express')()
app.use(require('body-parser').json())
const http = require('http').Server(app)
const io = require('socket.io')
const { getOutpost, saveMessage, getContactRequests, sendContactRequests, getMessages, getConnected, setConnected, removeConnected } = require('./db_interface')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('dev.db')
// ↓↓↓ Very important, routes won't work without this
app.locals.db = db
// ↑↑↑
app.use(require('cors')())

const nacl = require('tweetnacl')
const PORT = 4000

const ioSocket = io(http, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            //"Access-Control-Allow-Origin": '*', //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        }
        res.writeHead(200, headers)
        res.end()
    }})

// Only for development
db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS outposts (
            id TEXT,
            publicKey TEXT
            );`
    )
    db.run(
        `CREATE TABLE IF NOT EXISTS messages (
            recipient TEXT,
            message TEXT
        )`
    )
    db.run(
        `CREATE TABLE IF NOT EXISTS connected (
            id TEXT,
            outpostId TEXT
        )`
    )

    db.run(
        `CREATE TABLE IF NOT EXISTS contact_requests (
            senderId TEXT,
            recipientId TEXT
        )`
    )
})


/**
 * Mount router
 */
app.use('/outposts', require('./routes/outpost'))

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
        console.log('Someone wants to connect.')

        // This is whom they claim to be
        const supposedClient = await getOutpost(id, db)

        console.log('Someone wants to connect.')
        console.log(signedToken)

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

ioSocket.on('connection', socket => {
    /*
    * Tried to use this function as
    * middleware, but it wouldn't work
    * so we do it like this for now or ever
    */
    socketAuthentication(socket, db, async (id, socketId) => {
        getContactRequests(id, db)
        .then(requests => {
            if (requests.length > 0) {
                socket.emit('contactRequests', requests)
            }
        })

        socket.on('message', async message => {
            console.log(message)
            const { recipient } = message
            const connected = await getConnected(recipient, db)

            if (connected.length > 0) {
                connected.forEach(item => {
                    ioSocket.to(item.id).emit('message', message)
                })
            } else {
                console.log("Nobody matched.")
                saveMessage(recipient, JSON.stringify(message), db)
            }
        })

        socket.on('contactRequest', ({ id, recipientId }) => {
            sendContactRequests(id, recipientId, db)
        })
        
        socket.on('disconnect', () => {
            removeConnected(socketId, db)
            .then(success => {
                if (success) console.log(success)
            })
            console.log('Dropped')
        })
    })
})


http.listen(PORT)
