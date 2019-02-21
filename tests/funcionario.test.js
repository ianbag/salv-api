/**
 * author: NathanBarsoti8
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { FuncionarioModel } = require('./../app/models')

const MOCK_FUNCIONARIO_DEFAULT = {

}

const MOCK_FUNCIONARIO_CADASTRAR = {

}

const MOCK_FUNCIONARIO_ERROR = {

}

const MOCK_FUNCIONARIO_ATUALIZAR = {

}

let MOCK_FUNCIONARIO_CODIGO

//Início dos tests
