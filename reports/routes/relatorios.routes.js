const express = require('express')
const route = express.Router()

const RelatorioController = require('./../controller/relatorios')

route.get('/relatorio_funcionarios', RelatorioController.funcionarios),
route.get('/relatorio_acompanhamentos', RelatorioController.acompanhamentos),
route.get('/relatorio_convenios', RelatorioController.convenios)

module.exports = route