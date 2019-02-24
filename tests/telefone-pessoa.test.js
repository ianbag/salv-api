/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:50:35
 * @modify date 2019-02-20 20:11:41
 * @desc Arquivo de Testes da API de Telefone Pessoa
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { TelefonePessoaModel, PessoaModel, TelefoneModel } = require('./../app/models')

const MOCK_TELEFONE_DEFAULT = {
    DDD: '16',
    NUMERO: '982706173'
}

const MOCK_PESSOA_DEFAULT = {
    NOME: 'Rodoaldo',
    SOBRENOME: 'Silva Cruz',
    RG: '134521261',
    CPF: '7665755647',
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1991-04-17',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

let MOCK_TELEFONE_PESSOA_DEFAULT = {    
    PESSOA_CODIGO: null,
    TELEFONE_CODIGO: null
}

let MOCK_TELEFONE_PESSOA_CODIGO

describe.only('TDD Telefone Pessoa: ', function() {
    this.afterAll(async () => {
        await TelefoneModel.destroy({where: {CODIGO: MOCK_TELEFONE_PESSOA_DEFAULT.TELEFONE_CODIGO}})
        await PessoaModel.destroy({where: {CODIGO: MOCK_TELEFONE_PESSOA_DEFAULT.PESSOA_CODIGO}})
        await TelefonePessoaModel.destroy({where: {PESSOA_CODIGO: MOCK_TELEFONE_PESSOA_DEFAULT.PESSOA_CODIGO}, 
            where: { TELEFONE_CODIGO: MOCK_TELEFONE_PESSOA_DEFAULT.TELEFONE_CODIGO}})
    })
    this.beforeAll(async () => {
        const telefoneCadastrado = await TelefoneModel.create(MOCK_TELEFONE_DEFAULT)
        MOCK_TELEFONE_PESSOA_DEFAULT.TELEFONE_CODIGO = telefoneCadastrado.CODIGO

        const pessoaCadastrado = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_TELEFONE_PESSOA_DEFAULT.PESSOA_CODIGO = pessoaCadastrado.CODIGO

        console.log('MOCK_TELEFONE_PESSOA_DEFAULT', MOCK_TELEFONE_PESSOA_DEFAULT)

        const telefonePessoaCadastrado = await TelefonePessoaModel.create(MOCK_TELEFONE_PESSOA_DEFAULT)
        console.log('telefonePessoaCadastrado', telefonePessoaCadastrado)
        MOCK_TELEFONE_PESSOA_CODIGO = telefonePessoaCadastrado.PESSOA_CODIGO
        console.log('MOCK_TELEFONE_PESSOA_CODIGO', MOCK_TELEFONE_PESSOA_CODIGO)
    })

    

    it('teste', (done) => done())
})