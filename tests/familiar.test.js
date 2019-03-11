/**
 * author: hppod
 * create: 18/02/2019 15h24
 * file: familiar.test.js
 * description: Arquivo de teste automatizado da API SALV. Métodos "familiar" testados
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { FamiliarModel } = require('./../app/models')

//MOCANDO VALORES

const MOCK_FAMILIAR_DEFAULT = {
    NOME: 'VALDECIR',
    SOBRENOME: 'MATOS',
    PARENTESCO: 'FILHO',
}

const MOCK_FAMILIAR_CADASTRAR = {
    NOME: 'MARIA',
    SOBRENOME: 'CONCEIÇÃO',
    PARENTESCO: 'SOBRINHA'
}

const MOCK_FAMILIAR_ERROR = {
    NOME: 'YARA',
    SOBRENOME: 'MARTINS'
}

const MOCK_FAMILIAR_ATUALIZAR = {
    NOME: 'RAFAEL',
    SOBRENOME: 'JORGE',
    PARENTESCO: 'SOBRINHO'
}

let MOCK_FAMILIAR_CODIGO

//INICIO DOS TESTES

describe('Test Driven Development SALV-API Familiar', function () {
    this.beforeAll(async () => {
        const result = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)
        MOCK_FAMILIAR_CODIGO = result.CODIGO
    })

    //TESTE GET ALL

    describe('/GET: ', () => {
        it('Deve retornar os familiares presentes na base de dados', (done) => {
            chai.request(app)
                .get('/familiar')
                .end((error, res) => {
                    const result = res.body[res.body.length-1]
                    delete result.CODIGO
                    delete result.STATUS
                    expect(result).to.eql(MOCK_FAMILIAR_DEFAULT)
                    done()
                })
        })
    })

    //TESTE GET ID

    describe('/GET/ID: ', () => {
        it('Deve retornar um familiar dado o ID dele', (done) => {
            chai.request(app)
                .get(`/familiar/${MOCK_FAMILIAR_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FAMILIAR_DEFAULT)
                    done()
                })
        })
    })

    //TESTE POST

    describe('/POST: ', () => {
        it('Deve adicionar um familiar na base de dados', (done) => {
            chai.request(app)
                .post('/familiar')
                .send(MOCK_FAMILIAR_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FAMILIAR_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar familiar que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/familiar')
                .send(MOCK_FAMILIAR_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('PARENTESCO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //TESTE PUT

    describe('/PUT/ID: ', () => {
        it('Deve atualizar os dados do familiar de acordo com seu ID', (done) => {
            chai.request(app)
                .put(`/familiar/${MOCK_FAMILIAR_CODIGO}`)
                .send(MOCK_FAMILIAR_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //TESTE DELETE

    describe('/DELETE/ID: ', () => {
        it('Deve apagar um familiar dado seu ID', (done) => {
            chai.request(app)
                .delete(`/familiar/${MOCK_FAMILIAR_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })
})