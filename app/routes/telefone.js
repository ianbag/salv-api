/**
 * author: hppod
 * create: 20/02/2019 01h09
 * file: routes/telefone.js
 */

const express = require('express')
const route = express.Router()

const TelefoneController = require('./../controllers/telefone')

route.get('/telefone', TelefoneController.get)
route.get('/telefone/:id', TelefoneController.getById)
route.post('/telefone', TelefoneController.create)
route.put('/telefone/:id', TelefoneController.update)
route.delete('/telefone/:id', TelefoneController.delete)

module.exports = route