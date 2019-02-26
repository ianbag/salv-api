/**
 * author: hppod
 * create: 19/02/2019 20h39
 * file: routes/endereco.js
 */

const express = require('express')
const route = express.Router()

const EnderecoController = require('./../controllers/endereco')

route.get('/endereco', EnderecoController.get)
route.get('/endereco/:id', EnderecoController.getById)
route.post('/endereco', EnderecoController.create)
route.put('/endereco/:id', EnderecoController.update)
route.delete('/endereco/:id', EnderecoController.delete)

module.exports = route