const CICDB = require('../db_interface')
const Client = require('../Client/')
const niceware = require('niceware')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { validatePassphrase, validateId, validatePBK, validateString } = require('../validation')

const outpostPath = `${process.env.USER_DATA_PATH}/.outpost` 

/**
 * Write hash to file
 * @param {string} path 
 * @param {string} hash 
 */
const writeHash = async (path, hash) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, hash, { encoding: 'base64' }, (error) => {
      if (error) reject()
      resolve()
    })})
  .catch(error => {
    console.log("File error")
  })
}

/**
 * Compare an entered hash to hash from file
 * @param {string} pathToHash 
 * @param {string} enteredHash 
 */
const compareHash = async (pathToHash, enteredHash) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToHash, { encoding: 'base64' },(error, data) => {
      if (error) reject()
      resolve(enteredHash === data)
    })
  })
}

module.exports = {
    getExistsClient: async (request, reply) => {
      if (fs.existsSync(outpostPath)) {
        reply.send({
          result: 'true'
        })
      } else {
        reply.send({
          result: 'false'
        })
      }
    },

    postCreateClient: async (request, reply) => {
        const pass = validatePassphrase(request.body.passphrase)
        try {
          const client = await Client.create(pass)
          writeHash(outpostPath, client.hash)

          await request.app.locals.db.run(`PRAGMA key = '${pass}'`)
          await CICDB.createClient(client, request.app.locals.db)
          reply.send({
            result: 'success',
          })
        } catch (e) {
          reply.send({
            result: 'failure'
          })
          console.log(e)
        }
      },

      login: async (request, reply) => {
        const passphrase = validatePassphrase(request.body.passphrase)
        const hash = crypto.createHash('sha256')
          .update(passphrase, 'utf-8')
          .digest('base64')
        const success = await compareHash(outpostPath, hash)

        if (await success) {
            await request.app.locals.db.run(`PRAGMA key = '${passphrase}'`)
            const client = await CICDB.loadClient(request.app.locals.db)

            if (client) {
              const accessToken = "Bearer " + jwt.sign(
                { client: client.id, publicKey: client.publicKey },
                request.app.locals.accessTokenSecret,
                { expiresIn: '1d' }
              )

              reply.send({
                result: 'success',
                Authorization: accessToken,
                client: await client
              })
            } else {
              reply.send({ result: 'failure' })
            }
        } else {
        reply.send({ result: 'failure' })
        }
      },

      getPassphraseGenerate: async (request, reply) => {
        reply.send({ passphrase: niceware.generatePassphrase(16)})
    }
}