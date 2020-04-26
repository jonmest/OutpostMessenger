const nacl = require('tweetnacl')

const generateAsymmetricPair = () => {
    const keyPair =  nacl.box.keyPair()
    return {
        'privateKey': Buffer.from(keyPair.secretKey).toString('base64'),
        'publicKey': Buffer.from(keyPair.publicKey).toString('base64')
      }
}

module.exports = generateAsymmetricPair