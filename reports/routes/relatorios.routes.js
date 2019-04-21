const express = require('express')
const route = express.Router()

const RelatorioController = require('./../controller/relatorios')

route.get('/relatorio_funcionarios', RelatorioController.funcionarios)

module.exports = route