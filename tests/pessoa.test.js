/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:30:44
 * @modify date 2019-02-17 18:34:34
 * @desc TDD Pessoas
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { PessoaModel } = require('./../app/models')

const MOCK_PESSOA_DEFAULT = {
    NOME: 'Ian',
    SOBRENOME: 'Rotondo Bagliotti',
    RG: '468915217',
    CPF: '84404069405',
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

const MOCK_PESSOA_CADASTRAR = {
    NOME: 'João',
    SOBRENOME: 'Dos Santos',
    RG: '375394953',
    CPF: '06477076322',
    SEXO: 'm',
    ESTADO_CIVIL: 'c',
    DATA_NASCIMENTO: '1990-08-14',
    RELIGIAO: 'esp',
    ESCOLARIDADE: 'sc'
}

let MOCK_PESSOA_CADASTRAR_ERROR = {
    SOBRENOME: 'Simão Gluigo',
    RG: '338276804',
    CPF: '95650298173',
    SEXO: 'f',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1992-04-19',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

const MOCK_PESSOA_ATUALIZAR = {
    NOME: 'Maria',
    SOBRENOME: 'Pereira da Silva',
    RG: '237237866',
    CPF: '26835532939',
    SEXO: 'f',
    ESTADO_CIVIL: 'v',
    DATA_NASCIMENTO: '1972-05-07',
    RELIGIAO: 'eps',
    ESCOLARIDADE: 'si'
}

let MOCK_PESSOA_CODIGO

describe('TDD Pessoa', function () {
    this.beforeAll(async () => {
        await PessoaModel.destroy({ where: {} })
        const result = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_PESSOA_CODIGO = result.CODIGO
    })

    describe('/GET: ', () => {
        it('Deve retornar as Pessoas adicionadas', (done) => {
            chai.request(app)
                .get('/pessoa')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_PESSOA_DEFAULT)
                    done()
            })
        })
    })

    describe('/GET/ID: ', () => {
        it('Deve retornar uma Pessoa pelo ID', (done) => {
            chai.request(app)
                .get(`/pessoa/${MOCK_PESSOA_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_PESSOA_DEFAULT)
                    done()
            })
        })
    })

    describe('/POST: ', () => {
        it('Deve adicionar uma Pessoa', (done) => {
            chai.request(app)
                .post('/pessoa')
                .send(MOCK_PESSOA_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_PESSOA_CADASTRAR)
                    done()
            })
        })
        it('Deve retornar erro ao adicionar Pessoa, por faltar o campo NOME', (done) => {
            chai.request(app)
                .post('/pessoa')
                .send(MOCK_PESSOA_CADASTRAR_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('NOME')
                    expect(result.type).to.eql('notNull Violation')
                    done()
            })
        })
    })

    describe('/PUT/ID: ', () => {
        it('Deve atualizar uma pessoa pelo ID', (done) => {
            chai.request(app)
                .put(`/pessoa/${MOCK_PESSOA_CODIGO}`)
                .send(MOCK_PESSOA_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
            })
        })
    })

    describe('/DELETE/ID: ', () => {
        it('Deve deletar uma Pessoa pelo ID', (done) => {
            chai.request(app)
                .delete(`/pessoa/${MOCK_PESSOA_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
            })
        })
    })
})