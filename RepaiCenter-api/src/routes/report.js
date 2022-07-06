// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const ReportController = require('../controller/ReportController')

router.use('/report', ReportController)


module.exports = router