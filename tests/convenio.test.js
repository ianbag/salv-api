const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { ConvenioModel } = require('./../app/models')
const { EnderecoConvenioModel } = require('./../app/models')
const { TelefoneConvenioModel } = require('./../app/models')

const MOCK_CONVENIO_DEFAULT = {
    NOME_CONVENIO: 'Vida boa',
    TIPO_CONVENIO: 'Saúde'
}

const MOCK_CONVENIO_CADASTRAR = {
    NOME_CONVENIO: 'Gordurazero',
    TIPO_CONVENIO: 'Nutricionista'
}

const MOCK_CONVENIO_ERROR = {
    NOME_CONVENIO: 'Ossos fortes'
}

const MOCK_CONVENIO_ATUALIZAR = {
    NOME_CONVENIO: 'Boca limpa',
    TIPO_CONVENIO: 'Dentista'
}

let MOCK_CONVENIO_CODIGO

//TESTS

describe('Test Driven Development SALV-API Convenio', function () {
    this.beforeAll(async () => {
        await EnderecoConvenioModel.destroy({ where: {} })
        await TelefoneConvenioModel.destroy({ where: {} })
        await ConvenioModel.destroy({ where: {} })
        const result = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)
        MOCK_CONVENIO_CODIGO = result.CODIGO
    })

    //GET
    describe('/GET: ', () => {
        it('Deve retornar todos os convenios presentes na base de dados', (done) => {
            chai.request(app)
                .get('/convenio')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    delete result.STATUS
                    expect(result).to.eql(MOCK_CONVENIO_DEFAULT)
                    done()
                })
        })
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um convenio dado o ID dele', (done) => {
            chai.request(app)
                .get(`/convenio/${MOCK_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_CONVENIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        it('Deve adicionar um convenio na base de dados', (done) => {
            chai.request(app)
                .post('/convenio')
                .send(MOCK_CONVENIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_CONVENIO_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um convenio que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/convenio')
                .send(MOCK_CONVENIO_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('TIPO_CONVENIO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //PUT
    describe('/PUT/ID: ', () => {
        it('Deve atualizar os dados do convenio de acordo com o seu ID', (done) => {
            chai.request(app)
                .put(`/convenio/${MOCK_CONVENIO_CODIGO}`)
                .send(MOCK_CONVENIO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um convenio dado seu ID', (done) => {
            chai.request(app)
                .delete(`/convenio/${MOCK_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })
})