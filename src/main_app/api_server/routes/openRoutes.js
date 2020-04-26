/*
 * ROUTES:
 * Create Client
 *  POST /create-client
 * Generate passphrase
 *  GET /passphrase-generate
 */

/*
* Express and router
*/
const express = require('express')
const router = express.Router()
router.use(require('body-parser').json())

/*
* Controllers
*/
const { getExistsClient, postCreateClient, login, getPassphraseGenerate } = require('../controllers/openRoutes')

/**
 * Check if client is registered
 */
router.get('/exists-client', getExistsClient)
router.options('/exists-client', getExistsClient)

/**
 * POST /create-client
 */
router.post('/create-client', postCreateClient)
router.options('/create-client', postCreateClient)

/**
 * POST /login
 */
router.post('/login', login)


/**
 * GET /passphrase-generate
 */
router.get('/passphrase-generate', getPassphraseGenerate)


module.exports = router