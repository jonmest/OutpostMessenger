const nacl = require('tweetnacl')
const crypto = require('crypto')


const encryptKeyPair = (keyPair, masterKey) => {
    const object = {}
    const nonces = [crypto.randomBytes(24), crypto.randomBytes(24)]
    const masterKeyBuffer = Buffer.from(masterKey.key, 'base64')

    object.privateKey = Buffer.from(nacl.secretbox(
        Buffer.from(keyPair.privateKey, 'base64'),
        nonces[0],
        masterKeyBuffer
    )).toString('base64')
    object.publicKey = Buffer.from(nacl.secretbox(
        Buffer.from(keyPair.publicKey, 'base64'),
        nonces[1],
        masterKeyBuffer
    )).toString('base64')
    object.nonces = nonces.map(item => item.toString('base64'))

    return object
}

module.exports = encryptKeyPair