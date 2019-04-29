/**
 * author: NathanBarsoti8
*/

const express = require('express')
const route = express.Router()

const FuncionarioController = require('./../controllers/funcionario')

route.get('/funcionario', FuncionarioController.get)
route.get('/funcionarioInativo', FuncionarioController.getInativos)
route.get('/funcionario/:id', FuncionarioController.getById)
route.get('/funcionario-full/:id', FuncionarioController.getFuncionarioFull)
route.get('/funcionarioNome', FuncionarioController.getName)
route.post('/funcionario', FuncionarioController.create)
route.put('/funcionario/:id', FuncionarioController.update)
route.delete('/funcionario/:id', FuncionarioController.delete)
route.delete('/funcionario-ativar/:id', FuncionarioController.ativar)

module.exports = route
