const passphraseToKey = require('../crypto/key_gen/passphraseToKey')

test('throws error if no supplied passphrase', () => {
    expect(passphraseToKey).toThrow()
  })
 