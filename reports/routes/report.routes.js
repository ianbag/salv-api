//Requires
const express = require('express')
const route = express.Router()

//Require function
const reportFuncionario = require('../controllers/reports')

//HTTP method, call function
route.get('/relatorio-funcionarios', function (req, res) {
    reportFuncionario().then(response => {
        res.type('application/pdf')
        res.send(response)
    })
})

//Export routes
module.exports = route