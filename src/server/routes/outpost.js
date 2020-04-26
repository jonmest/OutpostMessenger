const express = require('express')
const router = express.Router()
router.use(require('body-parser').json())

const { getOutpost, postOutpost, getContactRequests, sendContactRequests } = require('../controllers/outpost')

router.use(require('cors')())

router.get('/', getOutpost)
router.options('/', getOutpost)

router.post('/', postOutpost)
router.options('/', postOutpost)


module.exports = router