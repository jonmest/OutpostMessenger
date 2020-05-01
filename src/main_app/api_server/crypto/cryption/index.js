const nacl = require('tweetnacl')


/**
 * Encrypt message object synchronously
 *
 * @param {Message} plainMessage
 * @param {Contact} recipient
 * @param {Client} myClient
 * @returns
 */
const encryptMessage_sync = (plainMessage, recipient, timestamp, myClient, isSignature) => {
    const nonce = nacl.randomBytes(nacl.box.nonceLength)
    const sender = myClient.id
    const plain = (isSignature) ? Buffer.from(plainMessage, 'base64') : Buffer.from(plainMessage)
    
    const secret = nacl.box(
            plain,
            nonce,
            Buffer.from(recipient.publicKey, 'base64'),
            Buffer.from(myClient.privateKey, 'base64') 
        )

    return JSON.stringify({
        recipient: recipient.id || recipient,
        sender,
        timestamp,
        nonce: Buffer.from(nonce).toString('base64'),
        secret: Buffer.from(secret).toString('base64')
    })
}

const encryptMessage = (plainMessage, recipient, timestamp, myClient, isSignature) => {
    return new Promise((resolve, reject) => {
        resolve(encryptMessage_sync(plainMessage, recipient, timestamp, myClient, isSignature))
        reject(() => {
            throw new Error()
        })
    })
}

const decryptMessage_sync = (cipherMessageObject, sender, myClient) => {
    const secret = Buffer.from(cipherMessageObject.secret, 'base64')
    const nonce = Buffer.from(cipherMessageObject.nonce, 'base64')
    const publicKey = Buffer.from(sender.publicKey, 'base64')
    const privateKey = Buffer.from(myClient.privateKey, 'base64')

    const decryptedSecret = nacl.box.open(
        secret,
        nonce,
        publicKey,
        privateKey
    )

    return {
        sender: sender.id,
        recipient: myClient.id,
        timestamp: cipherMessageObject.timestamp,
        data: Buffer.from(decryptedSecret, 'base64').toString('utf-8')
    }
}

const decryptMessage = (cipherMessageObject, sender, myClient) => {
    return new Promise((resolve, reject) => {
        resolve(decryptMessage_sync(cipherMessageObject, sender, myClient))
        reject(() => {
            throw new Error()
        })
    })
}

module.exports = {
    encryptMessage,
    decryptMessage
}
