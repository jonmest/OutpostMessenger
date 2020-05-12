/**
 * ROUTES:
 * Client
 *  GET /get-client/
 * Contacts
 *  GET /contacts
 *  POST /contacts
 * Messages
 *  GET /messages
 *  POST /messages
 * Encrypt / Decrypt
 *  POST /encrypt
 *  POST /decrypt
 */
const express = require('express')
const router = express.Router()

  /**
   * Misc. middleware
   */
  router.use(require('body-parser').json())

/*
* Controllers
*/
const { postClient, getContacts, postContacts, getMessages,
        postMessages, postEncrypt, postDecrypt, patchContacts, deleteContacts } =
        require('../controllers/outpostRoutes')

/**
 * Set client object to database
 * POST /client
 */
router.post('/client', postClient)

/**
 * GET /contacts
 * Gets all contacts or:
 * /contacts?id=contactId
 * For specific contact
 */
router.get('/contacts', getContacts)

/**
 * POST /contacts
 * Add a contact, post a contact object
 */
router.post('/contacts', postContacts)

/**
 * Update contact
 */
router.patch('/contacts', patchContacts)

/**
 * Delete contact
 */
router.delete('/contacts', deleteContacts)

/**
 * GET /messages
 * Returns all messages
 */
router.get('/messages', getMessages)

/**
 * POST /messages
 * Saves a message (from someone else)
 */
router.post('/messages', postMessages)

/**
 * POST /encrypt
 * Post message object to encrypt
 */
router.post('/encrypt', postEncrypt)

/**
 * POST /decrypt
 * Post ciphermessage object to decrypt
 */
router.post('/decrypt', postDecrypt)

module.exports = router