const nacl = require('tweetnacl')
const crypto = require('crypto')
const passphraseToKey = require('../crypto/key_gen/passphraseToKey')
const { validatePassphrase } = require('../validation')
/**
 * Client
 * @class Client
 */
class Client {
    /**
     *Creates an instance of Client.
     * @param {string||string[]} passphrase
     * @memberof Client
     */
    constructor (passphrase, salt) {
        const masterKey = passphraseToKey(passphrase, salt)
        this.masterKey = masterKey.key
        this.masterKeySalt = masterKey.salt

        const keyPair = nacl.box.keyPair()
        this.privateKey = Buffer.from(keyPair.secretKey).toString('base64')
        this.publicKey = Buffer.from(keyPair.publicKey).toString('base64')
        this.id = crypto.randomBytes(8).toString('hex')
        
        const validatedPass = validatePassphrase(passphrase)
        this.hash = crypto.createHash('sha256')
                    .update(validatedPass.slice(), 'utf-8')
                    .digest('base64')
    }

    /**
     * Async factory for Client
     * @static
     * @param {string||string[]} passphrase
     * @returns {Client instance}
     * @memberof Client
     */
    static async create (passphrase, salt) {
        return new Promise((resolve, reject) => {
            const client = new Client(passphrase, salt)
            resolve(client)
            reject(() => {
                console.log("Failed.")
            })
        })
    }
    
}

module.exports = Client