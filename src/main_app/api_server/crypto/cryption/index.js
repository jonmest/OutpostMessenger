const nacl = require('tweetnacl')


/**
 * Encrypt message object synchronously
 *
 * @param {Message} plainMessage
 * @param {Contact} recipient
 * @param {Client} myClient
 * @returns
 */
const encryptMessage_sync = (plainMessage, recipient, myClient) => {
    const nonce = nacl.randomBytes(nacl.box.nonceLength)
    const sender = myClient.id

    let secret
    if (typeof plainMessage === 'string') {
        secret = nacl.box(
            Buffer.from(plainMessage, 'base64'),
            nonce,
            Buffer.from(recipient.publicKey, 'base64'),
            Buffer.from(myClient.privateKey, 'base64') 
        )
    } else {
        secret = nacl.box(
            Buffer.from(
                JSON.stringify({
                message: plainMessage.message
            }), 'utf-8'),
            nonce,
            Buffer.from(recipient.publicKey, 'base64'),
            Buffer.from(myClient.privateKey, 'base64') 
        )
    }


    return JSON.stringify({
        recipient: recipient.id,
        sender,
        nonce: Buffer.from(nonce).toString('base64'),
        secret: Buffer.from(secret).toString('base64')
    })
}

const encryptMessage = (plainMessage, recipient, myClient) => {
    return new Promise((resolve, reject) => {
        resolve(encryptMessage_sync(plainMessage, recipient, myClient))
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
        recipient: myClient.id,
        sender: sender.id,
        message: JSON.parse(Buffer.from(decryptedSecret, 'base64').toString('utf-8')).message
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
