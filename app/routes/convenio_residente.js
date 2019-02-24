const express = require('express')
const route = express.Router()

const ResidenteConvenioController = require('./../controllers/residente_convenio')

route.get('/residente_convenio/:id', ResidenteConvenioController.getById)
route.post('/residente_convenio', ResidenteConvenioController.create)
route.delete('/residente_convenio/:id', ResidenteConvenioController.delete)

module.exports = route