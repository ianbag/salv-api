const express = require('express')
const route = express.Router()

const RelatorioController = require('./../controller/relatorios')
const RelatorioIDController = require('./../controller/relatorios_id')

// RELATÓRIOS GERAIS
route.get('/relatorio_funcionarios', RelatorioController.funcionarios),
route.get('/relatorio_acompanhamentos', RelatorioController.acompanhamentos),
route.get('/relatorio_convenios', RelatorioController.convenios),
route.get('/relatorio_residentes', RelatorioController.residentes)

// RELATÓRIOS POR ID
route.get('/relatorio_funcionario/:codigo_funcionario'),
route.get('/relatorio_acompanhamento/:codigo_acompanhamento'),
route.get('/relatorio_convenio/:codigo_convenio'),
route.get('/relatorio_residente/:codigo_residente')

module.exports = route