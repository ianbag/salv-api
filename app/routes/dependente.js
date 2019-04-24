/**
 * author: NathanBarsoti8
 */

 const express = require('express')
 const route = express.Router()

 const DependenteController = require('./../controllers/dependente')

 route.get('/dependente/:id', DependenteController.getById)
 route.get('/dependente/:id/:dependenteNome/:dependenteSobrenome', DependenteController.getByName)
 route.post('/dependente', DependenteController.create)
 route.put('/dependente/:id/:dependenteNome/:dependenteSobrenome', DependenteController.update)
 route.delete('/dependente/:dependenteNome/:dependenteSobrenome', DependenteController.delete)

 route.post('/dependente/rg', DependenteController.uniqueRG)
 route.post('/dependente/cpf', DependenteController.uniqueCPF)
 route.post('/dependente/numero_certidao_nascimento', DependenteController.uniqueNumeroCertidaoNascimento)

 module.exports = route