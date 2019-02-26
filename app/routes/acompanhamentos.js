const express = require('express')
const route = express.Router()

const AcompanhamentoController = require('../../../salv-api/controllers/acompanhamentos')

route.get('/acompanhamento', AcompanhamentoController.getAll)
route.get('/acompanhamento/:id', AcompanhamentoController.getById)
route.post('/acompanhamento', AcompanhamentoController.create)
route.put('/acompanhamento/:id', AcompanhamentoController.update)
route.delete('/acompanhamento/:id', AcompanhamentoController.delete)



const AcompanhamentoFuncionarioController = require('../../../salv-api/controllers/acompanhamentos')

route.get('/acompanhamento_funcionario', AcompanhamentoFuncionarioController.getAll)
route.get('/acompanhamento_funcionario/:id', AcompanhamentoFuncionarioController.getById)



const AcompanhamentoResidenteController = require('../../../salv-api/controllers/acompanhamentos')

route.get('/acompanhamento_residente', AcompanhamentoResidenteController.getAll)
route.get('/acompanhamento_residente/:id', AcompanhamentoResidenteController.getById)


module.exports = route