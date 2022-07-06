// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const MemberController = require('../controller/MemberController')

router.use('/member', MemberController)


module.exports = router