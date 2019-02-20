/**
 * author: hppod
 * create: 19/02/2019 23h42
 * file: endereco.test.js
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { EnderecoModel } = require('./../app/models')

const MOCK_ENDERECO_DEFAULT = {
    ENDERECO: 'Rua Santo Antonio',
    NUMERO: '856',
    BAIRRO: 'Centro',
    COMPLEMENTO: 'Ap. 125',
    CIDADE: 'São Francisco do Brejão',
    ESTADO: 'MA',
    CEP: '65929970',
    REFERENCIA: 'Lanchonete do Paulão'
}

const MOCK_ENDERECO_CADASTRAR = {
    ENDERECO: 'Avenida Vinte e Nove de Setembro',
    NUMERO: '747',
    BAIRRO: 'Centro',
    CIDADE: 'Cunhataí',
    ESTADO: 'SC',
    CEP: '89886971'
}

const MOCK_ENDERECO_ERROR = {
    ENDERECO: 'Rua Manoel Antônio Paes de Barros',
    NUMERO: '354',
    CIDADE: 'Aquidauana',
    ESTADO: 'MS',
    CEP: '79200973'
}

const MOCK_ENDERECO_ATUALIZAR = {
    ENDERECO: 'Avenida Rio Grande do Sul',
    NUMERO: '1336',
    BAIRRO: 'Centro',
    CIDADE: 'Planalto',
    ESTADO: 'PR',
    CEP: '85750970'
}

let MOCK_ENDERECO_CODIGO

//TESTS

describe('Test Driven Development SALV-API Endereço', function () {
    this.beforeAll(async () => {
        const result = await EnderecoModel.create(MOCK_ENDERECO_DEFAULT)
        MOCK_ENDERECO_CODIGO = result.CODIGO
    })

    //GET
    describe('/GET: ', () => {
        it('Deve retornar todos os endereços presentes na base de dados', (done) => {
            chai.request(app)
                .get('/endereco')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_ENDERECO_DEFAULT)
                    done()
                })
        })
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um endereço dado o ID dele', (done) => {
            chai.request(app)
                .get(`/endereco/${MOCK_ENDERECO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_ENDERECO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        it('Deve adicionar um endereço na base de dados', (done) => {
            chai.request(app)
                .post('/endereco')
                .send(MOCK_ENDERECO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_ENDERECO_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um endereço que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/endereco')
                .send(MOCK_ENDERECO_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('BAIRRO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //PUT
    describe('/PUT/ID: ', () => {
        it('Deve atualizar os dados do endereço de acordo com o seu ID', (done) => {
            chai.request(app)
                .put(`/endereco/${MOCK_ENDERECO_CODIGO}`)
                .send(MOCK_ENDERECO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um endereço dado seu ID', (done) => {
            chai.request(app)
                .delete(`/endereco/${MOCK_ENDERECO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})