/**
* Crypto and CIC
*/
const cryption = require('../crypto/cryption')
const CICDB = require('../db_interface/')

const fs = require('fs')
const crypto = require('crypto')
const { validatePassphrase, validateId, validatePBK, validateString } = require('../validation')


const outpostPath = `${process.env.USER_DATA_PATH}/.outpost` 

const compareHash = async (pathToHash, enteredHash) => {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToHash, { encoding: 'base64' },(error, data) => {
        if (error) reject()
        resolve(enteredHash === data)
      })
    })
  }

module.exports = {

    postClient: async (request, reply) => {
        const hash = crypto.createHash('sha256')
                    .update(
                        validatePassphrase(request.body.passphrase),
                        'utf-8')
                    .digest('base64')
        const success = await compareHash(outpostPath, hash)

        if (await success) {
                const client = await CICDB.loadClient(request.app.locals.db)
                reply.cookie('AuthToken', hash)
                reply.send({
                  result: 'success',
                  client: await client
                })
        } else {
            reply.send({
                result: 'failure'
              })
        }

    },
    
    getContacts: async (request, reply) => {
        // TODO: Parse to base64 and limit length? See unit tests
        const contactId = request.query.id

        if (contactId === undefined) {
            CICDB.loadContacts(request.app.locals.db)
            .then(contacts => reply.send({ contacts }))
            .catch(e => null)
        } else {
            CICDB.loadContact(
                validateId(contactId),
                request.app.locals.db
            ).then(contacts => reply.send({ contacts }))
            .catch(e => null)
        }
    },

    postContacts: async (request, reply) => {
        const contact = {}
        contact.id = validateId(request.body.id)
        contact.publicKey = validatePBK(request.body.publicKey)

        CICDB.saveContact(contact, request.app.locals.db)
        .then(resolve => {
            reply.send({
                result: 'success' })
            })
        .catch(reject => {
            reply.send({
                result: 'failure'
            })})
    },

    getMessages: async (request, reply) => {
        const senderId = validateId(request.query.id)
        const limit = request.query.limit

        const messages = (senderId === undefined) ? await CICDB.loadAllMessages(request.app.locals.db) : await CICDB.loadMessages(senderId, request.app.locals.db)
        
        let toReturn
        if (limit) {
            toReturn = messages.slice(messages.length - limit, messages.length)
        } else {
            toReturn = messages
        }
        reply.send({
            messages: toReturn
        })
    },

    postMessages: async (request, reply) => {
        const payload = request.body
        const message = {}
        message.sender = validateId(payload.sender)
        message.data = validateString(payload.data)
        message.timestamp = validateString(payload.timestamp)
        message.recipient = validateString(payload.recipient)
        
        CICDB.saveMessage(message, request.app.locals.db)
        .then(resolve => {
            reply.send({
                result: 'success'
            })})
        .catch(reject => {
            console.log(reject)
            reply.send({
                result: 'failure'
            })})
    
    },

    postEncrypt: async (request, reply) => {
        let recipient
        let isSignature = false

        if (request.body.serverKey) {
            recipient = {}
            recipient.id = 'Socket Server'
            recipient.publicKey = request.body.serverKey
            isSignature = true
        } else {
            recipient = await CICDB.loadContact(
                request.body.recipient, request.app.locals.db
            )
        }

        const { data, timestamp } = request.body

        const cipherMessage = await cryption.encryptMessage(
            data,
            recipient,
            timestamp,
            await CICDB.loadClient(request.app.locals.db),
            isSignature
        )
    
        reply.send({
            message: cipherMessage
        })
    },

    postDecrypt: async (request, reply) => {
        const message = request.body.message
        
        const sender = await CICDB.loadContact(
            validateId(message.sender),
            request.app.locals.db)
    
        const plaintextMessage = await cryption.decryptMessage(
            message,
            sender,
            await CICDB.loadClient(request.app.locals.db)
        )
    
        reply.send({
            message: plaintextMessage
        })
    }

}