const sequelize = require('./../../database/sequelize_remote')
const request = require('request')
const REPORT_API = 'http://localhost:3360/api/report'

const { FuncionarioModel, DependenteModel, TelefoneModel, EnderecoModel, UsuarioModel } = require('./../../app/models')

class Relatorios_ID {

}

module.exports = new Relatorios_ID()