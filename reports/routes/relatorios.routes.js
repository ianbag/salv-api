const express = require('express')
const route = express.Router()

const RelatorioController = require('../../reports/controller/relatorios')
const RelatorioIDController = require('../../reports-old/controller/relatorios_id')

// RELATÓRIOS GERAIS
route.get('/relatorio_funcionarios', RelatorioController.funcionarios),
// route.get('/relatorio_acompanhamentos', RelatorioController.acompanhamentos),
// route.get('/relatorio_convenios', RelatorioController.convenios),
// route.get('/relatorio_residentes', RelatorioController.residentes)

// RELATÓRIOS POR ID
route.get('/relatorio_funcionario/:codigoPessoa/:codigoFuncionario', RelatorioIDController.funcionario),
route.get('/relatorio_acompanhamento/:codigoAcompanhamento', RelatorioIDController.acompanhamento),
route.get('/relatorio_convenio/:codigoConvenio', RelatorioIDController.convenio),
route.get('/relatorio_residente/:codigo_residente')

module.exports = route