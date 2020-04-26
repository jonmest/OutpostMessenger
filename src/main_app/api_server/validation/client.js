const arrayPassphrase = (passphrase) => {
    if (passphrase.length !== 8) {
        throw new Error('Something bad happened.')
    }

    // Join into a string
    return passphrase.join('').toLowerCase()
}

const stringPassphrase = (passphrase) => {
    return passphrase.toLowerCase()
}

module.exports = {

    /**
     * Checks the validity of a passphrase.
     * IE, it's a string or array, right length
     * and ALWAYS returns a lowercases string
     * @param {string||Array} passphrase 
     * @returns {string}
     */
    passphrase: (passphrase) => {
        if (typeof passphrase === 'string') {
            return stringPassphrase(passphrase)
        } else if (Array.isArray(passphrase)) {
            return arrayPassphrase(passphrase)
        } else {
            throw new Error('Something bad happened.')
        }
    },

    /**
     * Validates id in hex format
     *
     * @param {string} id
     */
    validateId: id => {
        // Expect hex string to be 16 long
        if (id.length !== 16 || typeof id !== 'string') throw new Error()

        // Ensure its returned in hex format
        return Buffer.from(id, 'hex').toString('hex')
    },

    validatePBK: pbk => {
        // Expect base64 string to be 44 long
        if (pbk.length !== 44 || typeof id !== 'string') throw new Error()

        // Ensure its returned in base64 format
        return Buffer.from(pbk, 'base64').toString('base64')
    }
}