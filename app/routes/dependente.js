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

 module.exports = route