const express = require('express')
const route = express.Router()

const EnderecoConvenioController = require('./../controllers/endereco_convenio')

route.get('/endereco_convenio/:id', EnderecoConvenioController.getById)
route.post('/endereco_convenio', EnderecoConvenioController.create)
route.delete('/endereco_convenio/:id', EnderecoConvenioController.delete)

module.exports = route