/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-24 14:24:23
 * @modify date 2019-02-24 16:45:15
 * @desc Arquivo de Testes da API de Endereco Pessoa
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('../app')
const { EnderecoModel, PessoaModel, EnderecoPessoaModel } = require('./../app/models')

const MOCK_ENDERECO_DEFAULT = {
    ENDERECO: 'Rua São Luis',
    NUMERO: '123',
    BAIRRO: 'Centro',
    CIDADE: 'Taquaritinga',
    ESTADO: 'SP',
    CEP: 15900 - 000
}

let MOCK_PESSOA_DEFAULT = {
    NOME: 'Rodoaldo',
    SOBRENOME: 'Silva Cruz',
    RG: Math.floor(Math.random() * 999999999),
    CPF: Math.floor(Math.random() * 999999999),
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1991-04-17',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

let MOCK_ENDERECO_PESSOA_DEFAULT = {
    PESSOA_CODIGO: null,
    ENDERECO_CODIGO: null
}

let MOCK_ENDERECO_PESSOA_CADASTRAR = {
    PESSOA_CODIGO: null,
    ENDERECO_CODIGO: null
}

let MOCK_ENDERECO_PESSOA_CODIGO

describe('TDD Endereco Pessoa: ', function () {
    this.beforeAll(async () => {
        const enderecoCadastrado = await EnderecoModel.create(MOCK_ENDERECO_DEFAULT)
        MOCK_ENDERECO_PESSOA_DEFAULT.ENDERECO_CODIGO = enderecoCadastrado.CODIGO

        const pessoaCadastrado = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_ENDERECO_PESSOA_DEFAULT.PESSOA_CODIGO = pessoaCadastrado.CODIGO

        const enderecoPessoaCadastrado = await EnderecoPessoaModel.create(MOCK_ENDERECO_PESSOA_DEFAULT)
        MOCK_ENDERECO_PESSOA_CODIGO = enderecoPessoaCadastrado.PESSOA_CODIGO
    })

    describe('/GET/:ID ', () => {
        it('Deve retornar o enderco da pessoa pelo ID', (done) => {
            chai.request(app)
                .get(`/endereco_pessoa/${MOCK_ENDERECO_PESSOA_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(MOCK_ENDERECO_PESSOA_DEFAULT)
                    done()
                })
        })
    })

    describe('/POST ', () => {

        this.beforeEach(async () => {
            const enderecoCadastrado = await EnderecoModel.create(MOCK_ENDERECO_DEFAULT)
            MOCK_ENDERECO_PESSOA_CADASTRAR.ENDERECO_CODIGO = enderecoCadastrado.CODIGO

            // alterando dados únicos de RG e CPF
            MOCK_PESSOA_DEFAULT.RG = Math.floor(Math.random() * 999999999);
            MOCK_PESSOA_DEFAULT.CPF = Math.floor(Math.random() * 999999999);

            const pessoaCadastrado = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
            MOCK_ENDERECO_PESSOA_CADASTRAR.PESSOA_CODIGO = pessoaCadastrado.CODIGO
        })

        it('Deve adicionar um Endereco Pessoa no banco de dados', (done) => {
            chai.request(app)
                .post('/endereco_pessoa')
                .send(MOCK_ENDERECO_PESSOA_CADASTRAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(MOCK_ENDERECO_PESSOA_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um Endereco Pessoa com campo obrigatório faltante', (done) => {
            delete MOCK_ENDERECO_PESSOA_CADASTRAR.ENDERECO_CODIGO
            chai.request(app)
                .post('/endereco_pessoa')
                .send(MOCK_ENDERECO_PESSOA_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('ENDERECO_CODIGO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })


    describe('/DELETE/:ID', () => {
        it('Deve deletar o Endereco Pessoa pelo ID', (done) => {
            chai.request(app)
                .delete(`/endereco_pessoa/${MOCK_ENDERECO_PESSOA_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})