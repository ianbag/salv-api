//Requires
const express = require('express')
const route = express.Router()

//Require function
const { reportFuncionario, reportConvenio, reportAcompanhamento, reportResidente } = require('../controllers/reports')

//HTTP method, call function
route.get('/relatorio-funcionarios', function (req, res) {
    reportFuncionario().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-convenios', function (req, res) {
    reportConvenio().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-acompanhamentos', function (req, res) {
    reportAcompanhamento().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//HTTP method, call function
route.get('/relatorio-residentes', function (req, res) {
    reportResidente().then(response => {
        res.type('application/pdf')
        res.send(response)
    }).catch(error => {
        res.send(error)
    })
})

//Export routes
module.exports = route