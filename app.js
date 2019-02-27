const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PessoaRoute = require('./app/routes/pessoa')
const FamiliarRoute = require('./app/routes/familiar')
const ResidenteRoute = require('./app/routes/residente')
const EnderecoRoute = require('./app/routes/endereco')
const TelefoneRoute = require('./app/routes/telefone')
const BeneficioRoute = require('./app/routes/beneficio')
const TelefoneFamiliarRoute = require('./app/routes/telefone_familiar')
const EnderecoFamiliarRoute = require('./app/routes/endereco_familiar')
const ResidenteFamiliarRoute = require('./app/routes/residente_familiar')
const ConvenioRoute = require('./app/routes/convenio')
const TelefoneConvenioRoute = require('./app/routes/telefone_convenio')
const EnderecoConvenioRoute = require('./app/routes/endereco_convenio')
const ResidenteConvenioRoute = require('./app/routes/residente_convenio')
const TelefonePessoaRoute = require('./app/routes/telefone_pessoa')
const EnderecoPessoaRoute = require('./app/routes/endereco_pessoa')
const FuncionarioRoute = require('./app/routes/funcionario')
const UsuarioRoute = require('./app/routes/usuario')
const DependenteRoute = require('./app/routes/dependente')
const AcompanhamentoRoute = require('./app/routes/acompanhamentos')

/*
* CONFIG bodyParser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', function (req, res) {
    res.send("API Funcionando")
})

//API Pessoa
app.use('/', PessoaRoute)

//API Funcionario
app.use('/', FuncionarioRoute)

//API Usuario
app.use('/', UsuarioRoute)

//API Dependente
app.use('/', DependenteRoute)

//API FAMILIAR
app.use('/', FamiliarRoute)

//API Residente
app.use('/', ResidenteRoute)

//API ENDEREÇO
app.use('/', EnderecoRoute)

//API TELEFONE
app.use('/', TelefoneRoute)

//API BENEFICIO
app.use('/', BeneficioRoute)

//API TELEFONE_FAMILIAR
app.use('/', TelefoneFamiliarRoute)

//API ENDERECO_FAMILIAR
app.use('/', EnderecoFamiliarRoute)

//API RESIDENTE_FAMILIAR
app.use('/', ResidenteFamiliarRoute)

//API CONVENIO
app.use('/', ConvenioRoute)

// //API TELEFONE_CONVENIO
app.use('/', TelefoneConvenioRoute)

// //API ENDERECO_CONVENIO
app.use('/', EnderecoConvenioRoute)

// //API RESIDENTE_CONVENIO
app.use('/', ResidenteConvenioRoute)

//API TELEFONE_PESSOA
app.use('/', TelefonePessoaRoute)

// API ENDERECO_PESSOA
app.use('/', EnderecoPessoaRoute)

//API ACOMPANHAMENTO
app.use('/', AcompanhamentoRoute)

app.listen(3000, function () {
    console.log("API rodando na porta 3000")
})

module.exports = app
