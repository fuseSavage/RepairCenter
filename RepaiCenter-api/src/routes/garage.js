// import express from 'express'
const express = require('express')

const router = express.Router()

const GarageController = require('../controller/GarageController')

router.use('/garage', GarageController)


module.exports = router