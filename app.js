const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(cors())

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
const TelefoneParentescoRoute = require('./app/routes/telefone_parentesco')
const EnderecoConvenioRoute = require('./app/routes/endereco_convenio')
const ResidenteConvenioRoute = require('./app/routes/residente_convenio')
const TelefonePessoaRoute = require('./app/routes/telefone_pessoa')
const EnderecoPessoaRoute = require('./app/routes/endereco_pessoa')
const FuncionarioRoute = require('./app/routes/funcionario')
const UsuarioRoute = require('./app/routes/usuario')
const DependenteRoute = require('./app/routes/dependente')
const AcompanhamentoRoute = require('./app/routes/acompanhamentos')
const AcompanhamentoFuncionario = require('./app/routes/acompanhamento_funcionario')
const AcompanhamentoResidente = require('./app/routes/acompanhamento_residente')
const ReportRoute = require('./reports/routes/report.routes')
const CertidaoCasamento = require('./app/routes/certidao_casamento')

const HandleAuthentication = require('./auth/auth')
const HandleAuthorization = require('./auth/authz')
const forgotPassword = require('./auth/forgot')

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

app.post('/login', handleAuthentication)

app.route('/esqueci-a-senha')
    .post(forgot.forgot_password)

app.route('/esqueci-a-senha/:token')
    .post(forgot.reset_password)

app.route('/usuario/:username')
    .post(forgot.define_password)

//API Relatórios
app.use('/', reportRoute)

//API Pessoa
app.use('/', /*handleAuthorization,*/ PessoaRoute)

//API Funcionario
app.use('/', /*handleAuthorization,*/ FuncionarioRoute)

//API Usuario
app.use('/', /*handleAuthorization,*/ UsuarioRoute)

//API Dependente
app.use('/', /*handleAuthorization,*/ DependenteRoute)

//API FAMILIAR
app.use('/', /*handleAuthorization,*/ FamiliarRoute)

//API Residente
app.use('/', /*handleAuthorization,*/ ResidenteRoute)

//API ENDEREÇO
app.use('/', /*handleAuthorization,*/ EnderecoRoute)

//API TELEFONE
app.use('/', /*handleAuthorization,*/ TelefoneRoute)

//API BENEFICIO
app.use('/', /*handleAuthorization,*/ BeneficioRoute)

//API TELEFONE_FAMILIAR
app.use('/', /*handleAuthorization,*/ TelefoneFamiliarRoute)

//API ENDERECO_FAMILIAR
app.use('/', /*handleAuthorization,*/ EnderecoFamiliarRoute)

//API RESIDENTE_FAMILIAR
app.use('/', /*handleAuthorization,*/ ResidenteFamiliarRoute)

//API CONVENIO
app.use('/', /*handleAuthorization,*/ ConvenioRoute)

// //API TELEFONE_CONVENIO
app.use('/', /*handleAuthorization,*/ TelefoneConvenioRoute)

// //API ENDERECO_CONVENIO
app.use('/', /*handleAuthorization,*/ EnderecoConvenioRoute)

// //API RESIDENTE_CONVENIO
app.use('/', /*handleAuthorization,*/ ResidenteConvenioRoute)

//API TELEFONE_PESSOA
app.use('/', /*handleAuthorization,*/ TelefonePessoaRoute)

// API ENDERECO_PESSOA
app.use('/', /*handleAuthorization,*/ EnderecoPessoaRoute)

//API ACOMPANHAMENTO
app.use('/', /*handleAuthorization,*/ AcompanhamentoRoute)

//API ACOMPANHAMENTO FUNCIONARIO
app.use('/', /*handleAuthorization,*/ AcompanhamentoFuncionario)

//API ACOMPANHAMENTO RESIDENTE
app.use('/', /*handleAuthorization,*/ AcompanhamentoResidente)

//API CONVENIO
app.use('/', ConvenioRoute)

//API TELEFONE_CONVENIO
app.use('/', TelefoneConvenioRoute)

//API ENDERECO_CONVENIO
app.use('/', EnderecoConvenioRoute)

//API RESIDENTE_CONVENIO
app.use('/', ResidenteConvenioRoute)

// API CERTIDAO_CASAMENTO
app.use('/', CertidaoCasamento)

//API TELEFONE_PARENTESCO
app.use('/', TelefoneParentescoRoute)

//API RELATÓRIOS
// app.use('/', RelatorioRoutes)

app.listen(port, function () {
    console.log(`API LISTEN ON PORT ${port}`)
})

module.exports = app
