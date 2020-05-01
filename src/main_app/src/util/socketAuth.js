import { post } from './request'

const socketAuth = (socket, context, onAuthenticated) => {
    socket.on('Authentication request', async data => {
        post(
          'http://localhost:5000/outpost/encrypt',
          context.bearToken,
          {
            serverKey: data.publicKey,
            data: data.token
          }
        ).then(data => JSON.parse(data.message))
        .then(data => {
          console.log({ 
            signedToken: data.secret,
            nonce: data.nonce,
            id: data.sender
          })
          socket.emit('Authentication response', { 
            signedToken: data.secret,
            nonce: data.nonce,
            id: data.sender
          })
          console.log('Sent response.')

        })
        
        socket.on('Authentication success', data => {
            console.log('My vision is augmented.')
            onAuthenticated()
        })
    })
}

export default socketAuth