/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-24 14:24:23
 * @modify date 2019-02-24 14:24:23
 * @desc Arquivo de Testes da API de Endereco Pessoa
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('../app')
const { EnderecoModel, PessoaModel, EnderecoPessoaModel } = require('./../app/models')

describe('TDD Endereco Pessoa: ', function () {
    
})