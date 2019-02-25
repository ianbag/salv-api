const express = require('express')
const route = express.Router()

<<<<<<< HEAD
const AcompanhamentoController = require('./../controllers/acompanhamentos')
=======
const AcompanhamentoController = require('../../../salv-api/controllers/acompanhamentos')
>>>>>>> 973fde185069d7a11be065c7feaaddd2d8cd558b

route.get('/acompanhamento', AcompanhamentoController.getAll)
route.get('/acompanhamento/:id', AcompanhamentoController.getById)
route.post('/acompanhamento', AcompanhamentoController.create)
route.put('/acompanhamento/:id', AcompanhamentoController.update)
route.delete('/acompanhamento/:id', AcompanhamentoController.delete)



<<<<<<< HEAD
const AcompanhamentoFuncionarioController = require('./../controllers/acompanhamentos')
=======
const AcompanhamentoFuncionarioController = require('../../../salv-api/controllers/acompanhamentos')
>>>>>>> 973fde185069d7a11be065c7feaaddd2d8cd558b

route.get('/acompanhamento_funcionario', AcompanhamentoFuncionarioController.getAll)
route.get('/acompanhamento_funcionario/:id', AcompanhamentoFuncionarioController.getById)



<<<<<<< HEAD
const AcompanhamentoResidenteController = require('./../controllers/acompanhamentos')
=======
const AcompanhamentoResidenteController = require('../../../salv-api/controllers/acompanhamentos')
>>>>>>> 973fde185069d7a11be065c7feaaddd2d8cd558b

route.get('/acompanhamento_residente', AcompanhamentoResidenteController.getAll)
route.get('/acompanhamento_residente/:id', AcompanhamentoResidenteController.getById)


module.exports = route