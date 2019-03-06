/**
 * author: NathanBarsoti8
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { FuncionarioModel, PessoaModel } = require('./../app/models')

let MOCK_FUNCIONARIO_DEFAULT = {
    FILHOS_MENOR_14: 's',
    CARGO: 'Fisioterapeuta',
    DATA_ADMISSAO: '2010-01-29',
    DATA_DEMISSAO: '2015-12-20',
    PESSOA_CODIGO: null,
}

let MOCK_FUNCIONARIO_CADASTRAR = {
    FILHOS_MENOR_14: 'n',
    CARGO: 'Terapeuta ocupacional',
    DATA_ADMISSAO: '2016-03-14',
    PESSOA_CODIGO: null
}

let MOCK_FUNCIONARIO_ATUALIZAR = {
    FILHOS_MENOR_14: 's',
    CARGO: 'Dentista',
    DATA_ADMISSAO: '2017-06-30',
    PESSOA_CODIGO: null
}

let MOCK_FUNCIONARIO_CODIGO

// MOCK DEFAULT PESSOA
const MOCK_PESSOA_DEFAULT = {
    NOME: 'Ian',
    SOBRENOME: 'Rotondo Bagliotti',
    RG: Math.floor(Math.random() * 999999999),
    CPF: Math.floor(Math.random() * 999999999),
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

//Início dos tests

describe.only('TDD Funcionario', function () {
    this.beforeAll(async () => {
        const pessoa = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_FUNCIONARIO_DEFAULT.PESSOA_CODIGO = pessoa.CODIGO
        MOCK_FUNCIONARIO_CADASTRAR.PESSOA_CODIGO = pessoa.CODIGO
        MOCK_FUNCIONARIO_ATUALIZAR.PESSOA_CODIGO = pessoa.CODIGO

        const result = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)
        MOCK_FUNCIONARIO_CODIGO = result.CODIGO_FUNCIONARIO
    })
    //GET
    describe('/GET: ', () => {
        it('Deve retornar todos os funcionarios presentes no banco de dados', (done) => {
            chai.request(app)
                .get('/funcionario')
                .end((error, res) => {
                    const result = res.body[res.body.length-1]
                    delete result.CODIGO_FUNCIONARIO
                    expect(result).to.eql(MOCK_FUNCIONARIO_DEFAULT)
                    done()
                })
        })
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um funcionario com baso no ID dele', (done) => {
            chai.request(app)
                .get(`/funcionario/${MOCK_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO_FUNCIONARIO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FUNCIONARIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', function () {
        it('Deve adicionar um funcionario no banco de dados', (done) => {
            chai.request(app)
                .post('/funcionario')
                .send(MOCK_FUNCIONARIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO_FUNCIONARIO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FUNCIONARIO_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um funcionario que esteja com campo obrigatório em branco', (done) => {
            delete MOCK_FUNCIONARIO_CADASTRAR.CARGO
            chai.request(app)
                .post('/funcionario')
                .send(MOCK_FUNCIONARIO_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('CARGO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //PUT
    describe('/PUT/ID: ', () => {
        it('Atualizar os dados do funcionario de acordo com o seu ID', (done) => {
            chai.request(app)
                .put(`/funcionario/${MOCK_FUNCIONARIO_CODIGO}`)
                .send(MOCK_FUNCIONARIO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um funcionario com base no seu ID', (done) => {
            chai.request(app)
                .delete(`/funcionario/${MOCK_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })

})

