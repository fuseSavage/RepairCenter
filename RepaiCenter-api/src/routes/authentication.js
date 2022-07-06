const express = require('express')
const router = express.Router()
const AuthenticationController = require('../controller/AuthenticationController')

router.use('/authentication', AuthenticationController)


module.exports = router
