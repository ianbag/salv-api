const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { ResidenteConvenioModel } = require('./../app/models')
const { ConvenioModel } = require('./../app/models')
const { ResidenteModel } = require('./../app/models')

//INICIANDO MOCKS

const MOCK_RESIDENTE_CONVENIO_DEFAULT = {
    CONVENIO_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_RESIDENTE_CONVENIO_CADASTRAR = {
    CONVENIO_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_RESIDENTE_CONVENIO_ERROR = {
    CONVENIO_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_CONVENIO_DEFAULT = {
    NOME_CONVENIO: 'Ossos mais',
    TIPO_CONVENIO: 'Ortopedista'
}

const MOCK_RESIDENTE_DEFAULT = {
    APELIDO: 'Lobo',
    PROFISSAO: 'Analista e Desenvolvedor de Sistemas',
    TITULO_ELEITOR: '1232131',
    ZONA_ELEITORAL: '3AB',
    SECAO_ELEITORAL: '11',
    NUMERO_CERTIDAO_NASCIMENTO: '1234',
    FOLHA_CERTIDAO_NASCIMENTO: '22',
    LIVRO_CERTIDAO_NASCIMENTO: '5',
    CIDADE_CERTIDAO_NASCIMENTO: 'Taquaritinga',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP',
    CARTAO_SAMS: '153445131',
    CARTAO_SUS: '5189756891713',
    NUMERO_INSS: '123',
    BANCO_INSS: 'Banco do Brasil',
    AGENCIA_INSS: '0001',
    CONTA_INSS: '145165125 5',
    VALOR_INSS: 1000.50,
    SITUACAO_INSS: 'BCP',
    PROVA_VIDA_INSS: '2019-02-27',
    DATA_ACOLHIMENTO: '2018-05-07',
    DATA_DESACOLHIMENTO: null,
    MOTIVO_DESACOLHIMENTO: null,
    PESSOA_CODIGO: 1
}

let MOCK_RESIDENTE_CONVENIO_CONVENIO_CODIGO

//FINALIZANDO MOCKS

//TESTS

describe('Test Driven Development SALV-API Residente Familiar', function () {
    this.beforeAll(async () => {
        const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)
        const residente = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)

        console.log('ADICIONANDO VALORES AO MOCK')
        MOCK_RESIDENTE_CONVENIO_DEFAULT.CONVENIO_CODIGO = convenio.CODIGO
        MOCK_RESIDENTE_CONVENIO_DEFAULT.CODIGO_RESIDENTE = residente.CODIGO_RESIDENTE

        const result = await ResidenteConvenioModel.create(MOCK_RESIDENTE_CONVENIO_DEFAULT)

        MOCK_RESIDENTE_CONVENIO_CONVENIO_CODIGO = result.CONVENIO_CODIGO

        console.log('CONVENIO ' + MOCK_RESIDENTE_CONVENIO_CONVENIO_CODIGO)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar o residente de um convenio dado o ID dele', (done) => {
            chai.request(app)
                .get(`/residente_convenio/${MOCK_RESIDENTE_CONVENIO_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_CONVENIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        this.beforeAll(async () => {
            const residente = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_RESIDENTE_CONVENIO_CADASTRAR.CONVENIO_CODIGO = convenio.CODIGO
            MOCK_RESIDENTE_CONVENIO_CADASTRAR.CODIGO_RESIDENTE = residente.CODIGO_RESIDENTE
        })

        it('Deve adicionar um residente a um convenio na base de dados', (done) => {
            chai.request(app)
                .post('/residente_convenio')
                .send(MOCK_RESIDENTE_CONVENIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_CONVENIO_CADASTRAR)
                    done()
                })
        })

        this.beforeAll(async () => {
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_RESIDENTE_CONVENIO_ERROR.CONVENIO_CODIGO = convenio.CODIGO
        })

        it('Deve retornar erro ao tentat adicionar um residente convenio que steja com um campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/residente_convenio')
                .send(MOCK_RESIDENTE_CONVENIO_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(res.path).to.eql('CODIGO_RESIDENTE')
                    expect(res.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um residente convenio dado seu ID', (done) => {
            chai.request(app)
                .delete(`/residente_convenio/${MOCK_RESIDENTE_CONVENIO_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})