const express = require('express')
const route = express.Router()

const CertidaoCasamentoController = require('./../controllers/certidao_casamento')

route.get('/certidao_casamento', CertidaoCasamentoController.get)
route.get('/certidao_casamento/:id', CertidaoCasamentoController.getById)
route.post('/certidao_casamento', CertidaoCasamentoController.create)
route.put('/certidao_casamento/:id', CertidaoCasamentoController.update)

module.exports = route