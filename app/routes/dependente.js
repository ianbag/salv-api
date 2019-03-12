/**
 * author: NathanBarsoti8
 */

 const express = require('express')
 const route = express.Router()

 const DependenteController = require('./../controllers/dependente')

 route.get('/dependente/:id', DependenteController.getById)
 route.post('/dependente', DependenteController.create)
 route.put('/dependente/:id', DependenteController.update)
 route.delete('/dependente/:id', DependenteController.delete)

 module.exports = route