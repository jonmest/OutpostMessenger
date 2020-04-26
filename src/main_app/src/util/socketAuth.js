import { post } from './request'

const socketAuth = (socket, context, onAuthenticated) => {
    socket.on('Authentication request', async data => {
        let encryptedToken = await post(
          'http://localhost:5000/outpost/encrypt',
          context.bearToken,
          {
            serverKey: data.publicKey,
            message: data.token
          }
        ).then(data => JSON.parse(data.message))

        socket.emit('Authentication response', { 
          signedToken: encryptedToken.secret,
          nonce: encryptedToken.nonce,
          id: encryptedToken.sender
        })
        console.log('Sent response.')
        socket.on('Authentication success', data => {
            onAuthenticated()
        })
    })
}

export default socketAuth