const express = require('express')
const route = express.Router()

const AuthController = require('./../auth/authController')

route.post('/login', AuthController.login)

module.exports = route