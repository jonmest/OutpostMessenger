const jwt = require('jsonwebtoken');

module.exports = async (request, reply, next) => {
    let token

    try {
      token = request.headers.authorization.split(' ')[1]
      if (!token) {
        return reply.status(401).json('You need to login')
      }
      const decrypt = jwt.verify(token, request.app.locals.accessTokenSecret);
      request.user = {
        client: decrypt.id,
        publicKey: decrypt.publicKey,
      }
      next()
    } catch (err) {
      return reply.status(401).json('You need to login')
    }
}