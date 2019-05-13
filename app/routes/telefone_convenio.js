const express = require('express')
const route = express.Router()

const TelefoneConvenioController = require('../controllers/telefone_convenio')

route.get('/telefone_convenio/:id', TelefoneConvenioController.getById)
route.post('/telefone_convenio', TelefoneConvenioController.create)
route.delete('/telefone_convenio/:convenioId/:telefoneId', TelefoneConvenioController.delete)

module.exports = route