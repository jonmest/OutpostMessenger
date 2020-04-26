const encryptKeyPair = require('../crypto/key_gen/encryptKeyPair')
const generateAsymmetricKeypair = require('../crypto/key_gen/generateAsymmetricPair')
const passphraseToKey = require('../crypto/key_gen/passphraseToKey')
const decryptKeyPair = require('../crypto/key_gen/decryptKeyPair')

test('can encrypt and decrypt', () => {
    const masterKey = passphraseToKey('Hejsan')
    const keyPair = generateAsymmetricKeypair()

    const encrypted = encryptKeyPair(keyPair, masterKey)

    const decrypted = decryptKeyPair(encrypted, masterKey)

    expect(JSON.stringify(keyPair)).not.toBe('incorrect string')
    expect(JSON.stringify(keyPair)).toBe(JSON.stringify(decrypted))
})
