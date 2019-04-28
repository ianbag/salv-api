const express = require('express')
const route = express.Router()

const ConvenioController = require('./../controllers/convenio')

route.get('/convenio', ConvenioController.get)
route.get('/convenio-desativados', ConvenioController.getDesativados)
route.get('/convenio/:id', ConvenioController.getById)
route.get('/convenio-full/:id', ConvenioController.getConvenioFull)
route.get('/conveniooNome', ConvenioController.getName)
route.post('/convenio', ConvenioController.create)
route.put('/convenio/:id', ConvenioController.update)
route.delete('/convenio/:id', ConvenioController.delete)

module.exports = route