const nacl = require('tweetnacl')
const crypto = require('crypto')


const decryptKeyPair = (keyPair, masterKey) => {
    const object = {}
    const nonces = keyPair.nonces.map(
        item => Buffer.from(item, 'base64')
    )
    const masterKeyBuffer = Buffer.from(masterKey.key, 'base64')

    object.privateKey = Buffer.from(nacl.secretbox.open(
        Buffer.from(keyPair.privateKey, 'base64'),
        nonces[0],
        masterKeyBuffer
    )).toString('base64')
    object.publicKey = Buffer.from(nacl.secretbox.open(
        Buffer.from(keyPair.publicKey, 'base64'),
        nonces[1],
        masterKeyBuffer
    )).toString('base64')

    return object
}

module.exports = decryptKeyPair