const generateAsymmetricKeypair = require('../crypto/key_gen/generateAsymmetricPair')

test('creates a keypair object with private and public values', () => {
    const keypair = generateAsymmetricKeypair()
    
    expect(Object.keys(keypair).length).toBe(2)
  });
 
  
test('public key is of expected length', () => {
    const { publicKey } = generateAsymmetricKeypair();
    const public_key_buffer = Buffer.from(publicKey, 'base64')
    const STRING_EXPECTED_LENGTH = 44
    const BUFFER_EXPECTED_LENGTH = 32 // As per NaCls JS implementation

    expect(publicKey.length).toBe(STRING_EXPECTED_LENGTH)
    expect(public_key_buffer.length).toBe(BUFFER_EXPECTED_LENGTH)

})

test('private key is of expected length', () => {
    const { privateKey } = generateAsymmetricKeypair();
    const private_key_buffer = Buffer.from(privateKey, 'base64')
    const STRING_EXPECTED_LENGTH = 44
    const BUFFER_EXPECTED_LENGTH = 32 // As per NaCls JS implementation

    expect(privateKey.length).toBe(STRING_EXPECTED_LENGTH)
    expect(private_key_buffer.length).toBe(BUFFER_EXPECTED_LENGTH)

})

test('Keypairs are different from eachother', () => {
    const keypair1 = generateAsymmetricKeypair()
    const keypair2 = generateAsymmetricKeypair()
    
    expect(keypair1.publicKey).not.toEqual(keypair2.publicKey)
    expect(keypair1.privateKey).not.toEqual(keypair2.privateKey)
  });