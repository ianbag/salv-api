const express = require('express')
const route = express.Router()

const AcompanhamentoResidenteController = require('./../controllers/acompanhamento_residente')
route.get('/acompanhamento_residente/:id', AcompanhamentoResidenteController.getById)
route.post('/acompanhamento_residente', AcompanhamentoResidenteController.create)
route.delete('/acompanhamento_residente/:idResidente/:idAcompanhamento', AcompanhamentoResidenteController.delete)
route.delete('/acompanhamento_residenteAll/:idAcompanhamento', AcompanhamentoResidenteController.deleteAll)
route.post('/acompanhamento-data-inicial', AcompanhamentoResidenteController.dateStart)
route.post('/acompanhamento-data-inicial-final', AcompanhamentoResidenteController.dateStartandDateFinish)

module.exports = route