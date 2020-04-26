class PlainMessage {
    constructor ({ recipient, sender, message }) {
        this.#recipient = recipient
        this.#sender = sender
        this.#message = message
    }

    // Getters
    getRecipient () { return this.#recipient }
    getSender () { return this.#sender }
    getMessage () { return this.#message }

    static fromString (jsonString) {
        const object = JSON.parse(jsonString)

        for (key of ['sender', 'recipient', 'message']) {
            object[key] = base64ToBuffer(object[key])
        }

        const { sender, recipient, nonce, secret } = object
        const newEncryptedMessage = new EncryptedMessage({
            recipient, sender, nonce, secret
        })
        return newEncryptedMessage
    }

    toString () {
        return JSON.stringify(this)
    }
}

function base64ToBuffer (string) {
    return Buffer.from(string, 'base64')
}