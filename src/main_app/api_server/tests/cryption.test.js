const cryption = require('../crypto/cryption')
const nacl = require('tweetnacl')

let sender, keyPair1, recipient, keypair2, plainMessage

beforeEach(() => {
    keyPair1 = nacl.box.keyPair()
    sender = {
        'id': 'ERIK',
        'publicKey': keyPair1.publicKey,
        'privateKey': keyPair1.secretKey
    }

    keypair2 = nacl.box.keyPair()
    recipient = {
        'id': 'TOM',
        'publicKey': keypair2.publicKey,
        'privateKey': keypair2.secretKey
    }

    plainMessage = {
        'recipient' : recipient.id,
        'sender'    : sender.id,

        'message'   : {
            'count' : 1, // Start count at 1, always increase
            'plain' : "Hey Tom, it's Erik!"
        }
    }

  })


test('Can encrypt message', async () => {    
    const cipherMessage = await cryption.encryptMessage(
        plainMessage,
        recipient,
        sender
    )
    const messageObj = JSON.parse(cipherMessage)

    expect(typeof cipherMessage).toBe('string')
    expect(Object.keys(messageObj)).toContain('recipient')
    expect(Object.keys(messageObj)).toContain('nonce')
    expect(Object.keys(messageObj)).toContain('secret')
    expect(Object.keys(messageObj).length).toBe(4)
})

test('Can correctly decrypt message', async () => {    
    const cipherMessage = await cryption.encryptMessage(
        plainMessage,
        recipient,
        sender
    )
    
    const plaintext = await cryption.decryptMessage(
        JSON.parse(cipherMessage),
        sender,
        recipient
    )

    expect(Object.keys(plaintext)).toContain('recipient')
    expect(Object.keys(plaintext)).toContain('sender')
    expect(Object.keys(plaintext)).toContain('message')

    expect(Object.keys(plaintext.message)).toContain('count')
    expect(Object.keys(plaintext.message)).toContain('plain')

    expect(plaintext.sender).toBe("ERIK")
    expect(plaintext.recipient).toBe("TOM")
    expect(plaintext.message.count).toBe(1)
    expect(plaintext.message.plain).toBe("Hey Tom, it's Erik!")

})