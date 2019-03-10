/**
 * author: hppod
 * create: 09/03/2019 21h31
 * file: routes/auth.js
 */

const express = require('express')
const route = express.Router()

const handleAuthentication = require('./../controllers/auth')

route.post('/login', handleAuthentication)

module.exports = route