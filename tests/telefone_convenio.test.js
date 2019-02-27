const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { TelefoneConvenioModel } = require('./../app/models')
const { TelefoneModel } = require('./../app/models')
const { ConvenioModel } = require('./../app/models')

const MOCK_TELEFONE_CONVENIO_DEFAULT = {
    CONVENIO_CODIGO: null,
    TELEFONE_CODIGO: null
}

const MOCK_TELEFONE_CONVENIO_CADASTRAR = {
    CONVENIO_CODIGO: null,
    TELEFONE_CODIGO: null
}

const MOCK_TELEFONE_CONVENIO_ERROR = {
    CONVENIO_CODIGO: null
}

const MOCK_TELEFONE_DEFAULT = {
    DDD: '15',
    NUMERO: '35621512'
}

const MOCK_CONVENIO_DEFAULT = {
    NOME_CONVENIO: 'Sem Crise',
    TIPO_CONVENIO: 'Psicologo'
}

let MOCK_TELEFONE_CONVENIO_CONVENIO_CODIGO

//TESTS

describe('Test Driven Development SALV-API Telefone Convenio', function () {
    this.beforeAll(async () => {
        const telefone = await TelefoneModel.create(MOCK_TELEFONE_DEFAULT)
        const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

        console.log('ADICIONANDO VALORES AO MOCK')
        MOCK_TELEFONE_CONVENIO_DEFAULT.CONVENIO_CODIGO = convenio.CODIGO
        MOCK_TELEFONE_CONVENIO_DEFAULT.TELEFONE_CODIGO = telefone.CODIGO

        const result = await TelefoneConvenioModel.create(MOCK_TELEFONE_CONVENIO_DEFAULT)

        MOCK_TELEFONE_CONVENIO_CONVENIO_CODIGO = result.CONVENIO_CODIGO

        console.log('CONVENIO ' + MOCK_TELEFONE_CONVENIO_CONVENIO_CODIGO)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar o telefone de um convenio dado o ID dele', (done) => {
            chai.request(app)
                .get(`/telefone_convenio/${MOCK_TELEFONE_CONVENIO_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_TELEFONE_CONVENIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        this.beforeAll(async () => {
            const telefone = await TelefoneModel.create(MOCK_TELEFONE_DEFAULT)
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_TELEFONE_CONVENIO_CADASTRAR.CONVENIO_CODIGO = convenio.CODIGO
            MOCK_TELEFONE_CONVENIO_CADASTRAR.TELEFONE_CODIGO = telefone.CODIGO
        })

        it('Deve adicionar um telefone a um convenio na base de dados', (done) => {
            chai.request(app)
                .post('/telefone_convenio')
                .send(MOCK_TELEFONE_CONVENIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_TELEFONE_CONVENIO_CADASTRAR)
                    done()
                })
        })

        this.beforeAll(async () => {
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_TELEFONE_CONVENIO_ERROR.CONVENIO_CODIGO = convenio.CODIGO
        })

        it('Deve retornar erro ao tentar adicionar um telefone convenio que esteja com um campo obrigatorio em branco', (done) => {
            chai.request(app)
                .post('/telefone_convenio')
                .send(MOCK_TELEFONE_CONVENIO_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('TELEFONE_CODIGO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um telefone convenio dado seu ID', (done) => {
            chai.request(app)
                .delete(`/telefone_convenio/${MOCK_TELEFONE_CONVENIO_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})