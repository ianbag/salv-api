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
    NOME: 'Ronan',
    SOBRENOME: 'Perotti',
    RG: '963147852',
    CPF: '35714896205',
    SEXO: 'm',
    ESTADO_CIVIL: 'c',
    DATA_NASCIMENTO: '1990-11-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 's',
    CARGO: 'Fisioterapeuta',
    DATA_ADMISSAO: '2010-01-29',
    DATA_DEMISSAO: '2015-12-20'
}

const MOCK_FUNCIONARIO_CADASTRAR = {
    NOME: 'Joana',
    SOBRENOME: 'Portora',
    RG: '163985231',
    CPF: '30497096268',
    SEXO: 'f',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1996-12-20',
    RELIGIAO: 'eps',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 'n',
    CARGO: 'Terapeuta ocupacional',
    DATA_ADMISSAO: '2016-03-14'
}

const MOCK_FUNCIONARIO_ERROR = {
    NOME: 'João',
    SOBRENOME: 'Merchan',
    RG: '745896321',
    CPF: '45712036890',
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1993-02-18',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 's',
    DATA_ADMISSAO: '2016-07-08'
}

const MOCK_FUNCIONARIO_ATUALIZAR = {
    NOME: 'Paula',
    SOBRENOME: 'Brosvky',
    RG: '678412506',
    CPF: '86123749518',
    SEXO: 'f',
    ESTADO_CIVIL: 'c',
    DATA_NASCIMENTO: '1993-07-15',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 's',
    CARGO: 'Dentista',
    DATA_ADMISSAO: '2017-06-30'
}

let MOCK_FUNCIONARIO_CODIGO

//Início dos tests

describe('TDD Funcionario', function () {
    this.beforeAll(async () => {
        const result = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)
        MOCK_FUNCIONARIO_CODIGO = result.CODIGO
    })

    //GET
    describe('/GET: ', () => {
        it('Deve retornar todos os funcionarios presentes no banco de dados', (done) => {
            chai.request(app)
                .get('/funcionario')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
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
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FUNCIONARIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        it('Deve adicionar um funcionario no banco de dados', (done) => {
            chai.request(app)
                .post('/funcionario')
                .send(MOCK_FUNCIONARIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FUNCIONARIO_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um funcionario que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/funcionario')
                .send(MOCK_FUNCIONARIO_ERROR)
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

