/**
 * author: hppod
 * create: 21/02/2019 14h27
 * file: routes/telefone_familiar.js
 */

const express = require('express')
const route = express.Router()

const TelefoneFamiliarController = require('./../controllers/telefone_familiar')

route.get('/telefone_familiar/:id', TelefoneFamiliarController.getById)
route.post('/telefone_familiar', TelefoneFamiliarController.create)
route.delete('/telefone_familiar/:id', TelefoneFamiliarController.delete)

module.exports = route