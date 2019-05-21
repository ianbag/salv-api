//Requires
const express = require('express')
const route = express.Router()

//Require function
const { reportFuncionarios, reportConvenios, reportResidentes } = require('../controllers/reports')

//Require function
const { noDate, dateStart, dateStartAndDateFinish } = require('../controllers/acompanhamentos')

//Require function
const { reportAcompanhamento, reportConvenio, reportFuncionario, reportResidente } = require('../controllers/reports_id')

//HTTP method, call function
route.get('/relatorio-funcionarios/:status', function (req, res) {
    var status = req.params.status
    reportFuncionarios(status).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-convenios/:status', function (req, res) {
    var status = req.params.status
    reportConvenios(status).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-acompanhamentos', function (req, res) {
    const dateStart = req.body.dateStart
    // noDate().then(response => {
    //     res.type('application/pdf')
    //     res.send(response)
    // }).catch(error => {
    //     res.send(error)
    // })
    dateStart(dateStart).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
// route.get('/relatorio-acompanhamentos', function(req, res) {
//     reportAcompanhamentos().then(response => {
//         res.type('application/pdf')
//         res.send(response)
//     }).catch(error => {
//         res.send(error)
//     })
// })

//HTTP method, call function
route.get('/relatorio-residentes/:status', function (req, res) {
    var status = req.params.status
    reportResidentes(status).then(response => {
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

//HTTP method, call function
route.get('/relatorio-residente/:codigoPessoa/:codigoResidente', function (req, res) {
    var codigoPessoa = req.params.codigoPessoa
    var codigoResidente = req.params.codigoResidente
    reportResidente(codigoPessoa, codigoResidente).then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//Export routes
module.exports = route