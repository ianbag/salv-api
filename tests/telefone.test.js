/**
 * author: hppod
 * create: 20/02/2019 01h14
 * file: telefone.test.js
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { TelefoneModel } = require('./../app/models')

const MOCK_TELEFONE_DEFAULT = {
    DDD: '46',
    NUMERO: '992186721'
}

const MOCK_TELEFONE_CADASTRAR = {
    DDD: '46',
    NUMERO: '28099453'
}

const MOCK_TELEFONE_ERROR = {
    NUMERO: '38471827'
}

const MOCK_TELEFONE_ATUALIZAR = {
    DDD: '38',
    NUMERO: '992290996'
}

let MOCK_TELEFONE_CODIGO

//TESTS
describe('Test Driven Development SALV-API Telefone', function () {
    this.beforeAll(async () => {
        const result = await TelefoneModel.create(MOCK_TELEFONE_DEFAULT)
        MOCK_TELEFONE_CODIGO = result.CODIGO
    })

    //GET
    describe('/GET: ', () => {
        it('Deve retornar todos os telefones presentes na base de dados', (done) => {
            chai.request(app)
                .get('/telefone')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_TELEFONE_DEFAULT)
                    done()
                })
        })
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um telefone dado o ID dele', (done) => {
            chai.request(app)
                .get(`/telefone/${MOCK_TELEFONE_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_TELEFONE_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        it('Deve adicionar um telefone na base de dados', (done) => {
            chai.request(app)
                .post('/telefone')
                .send(MOCK_TELEFONE_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_TELEFONE_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um telefone que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/telefone')
                .send(MOCK_TELEFONE_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('DDD')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //PUT
    describe('/PUT/ID: ', () => {
        it('Deve atualizar os dados do telefone de acordo com o seu ID', (done) => {
            chai.request(app)
                .put(`/telefone/${MOCK_TELEFONE_CODIGO}`)
                .send(MOCK_TELEFONE_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um telefone dado seu ID', (done) => {
            chai.request(app)
                .delete(`/telefone/${MOCK_TELEFONE_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})
