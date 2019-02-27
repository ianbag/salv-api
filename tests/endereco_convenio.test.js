const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { EnderecoConvenioModel } = require('./../app/models')
const { EnderecoModel } = require('./../app/models')
const { ConvenioModel } = require('./../app/models')

//INICIANDO MOCKS

const MOCK_ENDERECO_CONVENIO_DEFAULT = {
    CONVENIO_CODIGO: null,
    ENDERECO_CODIGO: null,
}

const MOCK_ENDERECO_CONVENIO_CADASTRAR = {
    CONVENIO_CODIGO: null,
    ENDERECO_CODIGO: null
}

const MOCK_ENDERECO_CONVENIO_ERROR = {
    CONVENIO_CODIGO: null
}

const MOCK_CONVENIO_DEFAULT = {
    NOME_CONVENIO: 'Saude mais',
    TIPO_CONVENIO: 'Nutricionista'
}

const MOCK_ENDERECO_DEFAULT = {
    ENDERECO: 'Rua do Rio Branco',
    NUMERO: '563',
    BAIRRO: 'Centro',
    COMPLEMENTO: 'Ap. 253',
    CIDADE: 'Itápolis',
    ESTADO: 'SP',
    CEP: '14900000',
    REFERENCIA: 'Lanchonete do Fernando'
}

let MOCK_ENDERECO_CONVENIO_CONVENIO_CODIGO

//FINALIZANDO MOCKS

//TESTS

describe('Test Driven Development SALV-API Endereço Convenio', function () {
    this.beforeAll(async () => {
        const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)
        const endereco = await EnderecoModel.create(MOCK_ENDERECO_DEFAULT)

        console.log('ADICIONANDO VALORES AO MOCK')
        MOCK_ENDERECO_CONVENIO_DEFAULT.CONVENIO_CODIGO = convenio.CODIGO
        MOCK_ENDERECO_CONVENIO_DEFAULT.ENDERECO_CODIGO = endereco.CODIGO

        const result = await EnderecoConvenioModel.create(MOCK_ENDERECO_CONVENIO_DEFAULT)

        MOCK_ENDERECO_CONVENIO_CONVENIO_CODIGO = result.CONVENIO_CODIGO

        console.log('CONVENIO' + MOCK_ENDERECO_CONVENIO_CONVENIO_CODIGO)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar o endereco de um convenio dado o ID dele', (done) => {
            chai.request(app)
                .get(`/endereco_convenio/${MOCK_ENDERECO_CONVENIO_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_ENDERECO_CONVENIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        this.beforeAll(async () => {
            const endereco = await EnderecoModel.create(MOCK_ENDERECO_DEFAULT)
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_ENDERECO_CONVENIO_CADASTRAR.CONVENIO_CODIGO = convenio.CODIGO
            MOCK_ENDERECO_CONVENIO_CADASTRAR.ENDERECO_CODIGO = endereco.CODIGO
        })

        it('Deve adicionar um endereço a um convenio na base de dados', (done) => {
            chai.request(app)
                .post('/endereco_convenio')
                .send(MOCK_ENDERECO_CONVENIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_ENDERECO_CONVENIO_CADASTRAR)
                    done()
                })
        })

        this.beforeAll(async () => {
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_ENDERECO_CONVENIO_ERROR.CONVENIO_CODIGO = convenio.CODIGO
        })

        it('Deve retornar erro ao tentar adicionar um endereço do convenio que esteja com um campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/endereco_convenio')
                .send(MOCK_ENDERECO_CONVENIO_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('ENDERECO_CODIGO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um endereço do convenio dado seu ID', (done) => {
            chai.request(app)
                .delete(`/endereco_convenio/${MOCK_ENDERECO_CONVENIO_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})