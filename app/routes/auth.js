/**
 * author: hppod
 * create: 09/03/2019 21h31
 * file: routes/auth.js
 */

const express = require('express')
const route = express.Router()

const AuthController = require('./../controllers/auth')

route.post('/login', AuthController.login)

module.exports = route