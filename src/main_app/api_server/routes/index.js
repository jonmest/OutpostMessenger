const express = require('express')
const router = express.Router()

router.use('/outpost', require('../middlewares/verifyToken'), require('./outpostRoutes'))
router.use('/open', require('./openRoutes.js'))

module.exports = router