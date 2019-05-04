//Requires
const express = require('express')
const route = express.Router()

//Require function
const { reportFuncionarios, reportConvenios, reportAcompanhamentos, reportResidentes } = require('../controllers/reports')

//Require function
const { reportAcompanhamento, reportConvenio, reportFuncionario } = require('../controllers/reports_id')

//HTTP method, call function
route.get('/relatorio-funcionarios', function (req, res) {
    reportFuncionarios().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-convenios', function (req, res) {
    reportConvenios().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-acompanhamentos', function (req, res) {
    reportAcompanhamentos().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-residentes', function (req, res) {
    reportResidentes().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-acompanhamento/:codigoAcompanhamento', function (req, res) {
    var codigoAcompanhamento = req.params.codigoAcompanhamento
    reportAcompanhamento(codigoAcompanhamento).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-convenio/:codigoConvenio', function (req, res) {
    var codigoConvenio = req.params.codigoConvenio
    reportConvenio(codigoConvenio).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-funcionario/:codigoPessoa/:codigoFuncionario', function (req, res) {
    var codigoPessoa = req.params.codigoPessoa
    var codigoFuncionario = req.params.codigoFuncionario
    reportFuncionario(codigoPessoa, codigoFuncionario).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//Export routes
module.exports = route