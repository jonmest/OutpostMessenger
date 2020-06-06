const cryption = require('../crypto/cryption')
const nacl = require('tweetnacl')
let sender, keyPair1, recipient, keypair2, plainMessage, isSignature

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
        'timestamp': '2020-5-15 9:14:4.000',
        'data'   : "Hey Tom, it's Erik!"
    }

    isSignature = false
  })


test('Can encrypt message', async () => {    
    const cipherMessage = await cryption.encryptMessage(
        plainMessage.data,
        recipient,
        plainMessage.timestamp,
        sender,
        isSignature
    )
    const messageObj = JSON.parse(cipherMessage)

    expect(typeof cipherMessage).toBe('string')
    expect(Object.keys(messageObj)).toContain('timestamp')
    expect(Object.keys(messageObj)).toContain('recipient')
    expect(Object.keys(messageObj)).toContain('nonce')
    expect(Object.keys(messageObj)).toContain('secret')
    // Expect keys to be:
    // Recipient, sender, timestamp, nonce, secret
    expect(Object.keys(messageObj).length).toBe(5)
})

test('Can correctly decrypt message', async () => {    
    const cipherMessage = await cryption.encryptMessage(
        plainMessage.data,
        recipient,
        plainMessage.timestamp,
        sender,
        isSignature
    )
    
    const plaintext = await cryption.decryptMessage(
        JSON.parse(cipherMessage),
        sender,
        recipient
    )

    expect(Object.keys(plaintext)).toContain('recipient')
    expect(Object.keys(plaintext)).toContain('sender')
    expect(Object.keys(plaintext)).toContain('data')
    expect(Object.keys(plaintext)).toContain('timestamp')

    expect(plaintext.sender).toBe("ERIK")
    expect(plaintext.recipient).toBe("TOM")
    expect(plaintext.timestamp).toBe('2020-5-15 9:14:4.000')
    expect(plaintext.data).toBe("Hey Tom, it's Erik!")

})