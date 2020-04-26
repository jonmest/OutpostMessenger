class CipherMessage {
    constructor ({ recipient, sender, nonce, secret }) {
        this.#recipient = recipient
        this.#sender = sender
        this.#nonce = nonce
        this.#secret = secret
    }

    // Getters
    getRecipient () { return this.#recipient }
    getSender () { return this.#sender }
    getNonce () { return this.#nonce }
    getSecret () { return this.#secret }

    static fromString (jsonString) {
        const object = JSON.parse(jsonString)

        for (key of ['sender', 'recipient', 'nonce', 'secret']) {
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