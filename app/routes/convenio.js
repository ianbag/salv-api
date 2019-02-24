const express = require('express')
const route = express.Router()

const ConvenioController = require('./../controllers/convenio')

route.get('/convenio', ConvenioController.get)
route.get('/convenio/:id', ConvenioController.getById)
route.post('/convenio', ConvenioController.create)
route.put('/convenio/:id', ConvenioController.update)
route.delete('/convenio/:id', ConvenioController.delete)

module.exports = route