/**
 * author: NathanBarsoti8
 */

 const express = require('express')
 const route = express.Router()

 const DependenteController = require('./../controllers/dependente')

 route.get('/dependente/:id', DependenteController.getById)
 route.get('/dependente', DependenteController.create)
 route.get('/dependente', DependenteController.update)
 route.get('/dependente', DependenteController.delete)

 module.exports = route