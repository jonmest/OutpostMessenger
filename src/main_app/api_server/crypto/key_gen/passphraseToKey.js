const crypto = require('crypto')
const nacl = require('tweetnacl')

const { validatePassphrase } = require('../../validation')
const KEY_LENGTH = nacl.secretbox.keyLength
/**
 * 
 * @param {string||string[]} passphrase 
 * @param {string} salt OPTIONAL
 * @returns {object} String Base64, String Base64
 */
const passphraseToKey = (passphrase, salt) => {
    if (passphrase == undefined || passphrase == null) {
        throw new Error('Something went wrong.')
    }
    
    const pass = validatePassphrase(passphrase)

    /*
    * Salt should be at least 16 bytes, see https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
    */
    const saltBuffer = (salt == undefined) ? crypto.randomBytes(16) :  Buffer.from(salt, 'base64')
    
    const key = crypto.pbkdf2Sync(
        pass,
        saltBuffer,
        150000,
        KEY_LENGTH,
        'sha512'
    )

    return  { 
        'salt' : saltBuffer.toString('base64'),
        'key' : key.toString('base64')
    }
}

module.exports = passphraseToKey