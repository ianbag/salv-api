const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PessoaRoute = require('./app/routes/pessoa')
const FamiliarRoute = require('./app/routes/familiar')

/*
* CONFIG bodyParser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', function(req, res){
    res.send("API Funcionando")
})

//API Pessoa
app.use('/', PessoaRoute)
app.use('/', FamiliarRoute)

app.listen(3000, function(){
    console.log("API rodando na porta 3000")
})

module.exports = app