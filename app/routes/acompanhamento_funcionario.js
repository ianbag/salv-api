const express = require('express')
const route = express.Router()

const AcompanhamentoFuncionarioController = require('../../../salv-api/app/controllers/acompanhamento_funcionario')
route.get('/acompanhamento_funcionario/:id', AcompanhamentoFuncionarioController.getById)
route.post('/acompanhamento_funcionario', AcompanhamentoFuncionarioController.create)
route.delete('/acompanhamento_funcionario/:idFuncionario/:idAcompanhamento', AcompanhamentoFuncionarioController.delete)

module.exports = route