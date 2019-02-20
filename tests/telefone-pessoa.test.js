/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:50:35
 * @modify date 2019-02-20 19:50:35
 * @desc Arquivo de Testes da API de Telefone Pessoa
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { TelefonePessoaModel } = require('./../app/models')

describe('TDD Telefone Pessoa: ', function() {

})