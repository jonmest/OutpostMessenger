const cryption = require('../crypto/cryption')
const nacl = require('tweetnacl')
const Client = require('../Client')

let client
const controlObject = {
    masterKey: '0rhbNPbmWTMZCXM2qGxJPuOPsQAd7X30bFDOB7x8+vQ=',
    masterKeySalt: 'N2tmQXZlYkF6NmJZV0JoYQ==',
    privateKey: 'sWAaCaXovZGXYPYEiwflAxNZjLeBEPCLGr46D53Crbc=',
    publicKey: 'CYz82KPNVUvRihqLZoACc11LJPUshllADjB4p1vo+VE=',
    id: 'uICPPf6JbFKFz9jFC7YWfD2o'
  }


test('Can deterministically create client master key from passphrase and salt.', async () => {    
    client = await Client.create('TESTPHRASE', 'N2tmQXZlYkF6NmJZV0JoYQ==')
    // Master key should always become the same when same passphrase and salt
    expect(client.masterKey).toBe(controlObject.masterKey)
    expect(client.masterKeySalt).toBe(controlObject.masterKeySalt)
})

test('Can randomly create client from only passphrase.', async () => {    
    client = await Client.create('TESTPHRASE')
    expect(client.masterKey).not.toBe(controlObject.masterKey)
    expect(client.masterKeySalt).not.toBe(controlObject.masterKeySalt)
})

test('no matter what, ID and asymmetric keypair is random even with same passphrase', async () => {
    client = await Client.create('TESTPHRASE', 'N2tmQXZlYkF6NmJZV0JoYQ==')
    expect(client.privateKey).not.toBe(controlObject.privateKey)
    expect(client.publicKey).not.toBe(controlObject.publicKey)
    expect(client.id).not.toBe(controlObject.id)

    client2 = await Client.create('TESTPHRASE')
    expect(client2.privateKey).not.toBe(client.privateKey)
    expect(client2.publicKey).not.toBe(client.publicKey)
    expect(client2.id).not.toBe(client.id)
})

test('that ID length is correct', async () => {
    client = await Client.create('TESTPHRASE')
    expect(client.id.length).toBe(16) // String length base64
    expect(Buffer.from(client.id, 'hex').length).toBe(8) //bytes
})

test('that master key length is correct', async () => {
    client = await Client.create('TESTPHRASE')
    expect(client.masterKey.length).toBe(44) // String length base64
    expect(Buffer.from(client.masterKey, 'base64').length).toBe(32) //bytes
})

test('that master salt length is correct', async () => {
    client = await Client.create('TESTPHRASE')
    expect(client.masterKeySalt.length).toBe(24) // String length base64
    expect(Buffer.from(client.masterKeySalt, 'base64').length).toBe(16) //bytes
})

test('that public key length is correct', async () => {
    client = await Client.create('TESTPHRASE')
    expect(client.publicKey.length).toBe(44) // String length base64
    expect(Buffer.from(client.publicKey, 'base64').length).toBe(32) //bytes
})

test('that private key length is correct', async () => {
    client = await Client.create('TESTPHRASE')
    expect(client.privateKey.length).toBe(44) // String length base64
    expect(Buffer.from(client.privateKey, 'base64').length).toBe(32) //bytes
})
