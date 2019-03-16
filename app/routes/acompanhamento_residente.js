const express = require('express')
const route = express.Router()

const AcompanhamentoResidenteController = require('../../../salv-api/app/controllers/acompanhamento_residente')
route.get('/acompanhamento_residente/:id', AcompanhamentoResidenteController.getById)
route.post('/acompanhamento_residente', AcompanhamentoResidenteController.create)
route.delete('/acompanhamento_residente/:id', AcompanhamentoResidenteController.delete)

module.exports = route