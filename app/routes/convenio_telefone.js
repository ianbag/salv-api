const express = require('express')
const route = express.Router()

const TelefoneConvenioController = require('./../controllers/telefone_Convenio')

route.get('/telefone_Convenio/:id', TelefoneConvenioController.getById)
route.post('/telefone_Convenio', TelefoneConvenioController.create)
route.delete('/telefone_Convenio/:id', TelefoneConvenioController.delete)

module.exports = route