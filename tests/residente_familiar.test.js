/**
 * author: hppod
 * create: 23/02/2019 00h53
 * file: residente_familiar.test.js
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { ResidenteFamiliarModel } = require('./../app/models')
const { FamiliarModel } = require('./../app/models')
const { ResidenteModel } = require('./../app/models')

//INICIANDO MOCKS

const MOCK_RESIDENTE_FAMILIAR_DEFAULT = {
    FAMILIAR_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_RESIDENTE_FAMILIAR_CADASTRAR = {
    FAMILIAR_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_RESIDENTE_FAMILIAR_ERROR = {
    FAMILIAR_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_FAMILIAR_DEFAULT = {
    NOME: 'PAMELA',
    SOBRENOME: 'CRISTINA',
    PARENTESCO: 'SOBRINHA'
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

let MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO

//FINALIZANDO MOCKS

//TESTS

describe('Test Driven Development SALV-API Residente Familiar', function () {
    this.beforeAll(async () => {
        const familiar = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)
        const residente = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)

        console.log('ADICIONANDO VALORES AO MOCK')
        MOCK_RESIDENTE_FAMILIAR_DEFAULT.FAMILIAR_CODIGO = familiar.CODIGO
        MOCK_RESIDENTE_FAMILIAR_DEFAULT.CODIGO_RESIDENTE = residente.CODIGO_RESIDENTE

        const result = await ResidenteFamiliarModel.create(MOCK_RESIDENTE_FAMILIAR_DEFAULT)

        MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO = result.FAMILIAR_CODIGO

        console.log('FAMILIAR ' + MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar o residente de um familiar dado o ID dele', (done) => {
            chai.request(app)
                .get(`/residente_familiar/${MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_FAMILIAR_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        this.beforeAll(async () => {
            const residente = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
            const familiar = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_RESIDENTE_FAMILIAR_CADASTRAR.FAMILIAR_CODIGO = familiar.CODIGO
            MOCK_RESIDENTE_FAMILIAR_CADASTRAR.CODIGO_RESIDENTE = residente.CODIGO_RESIDENTE
        })

        it('Deve adicionar um residente a um familiar na base de dados', (done) => {
            chai.request(app)
                .post('/residente_familiar')
                .send(MOCK_RESIDENTE_FAMILIAR_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_FAMILIAR_CADASTRAR)
                    done()
                })
        })

        this.beforeAll(async () => {
            const familiar = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)

            console.log('ADICIONANDO VALORES AO MOCK')
            MOCK_RESIDENTE_FAMILIAR_ERROR.FAMILIAR_CODIGO = familiar.CODIGO
        })

        it('Deve retornar erro ao tentat adicionar um residente familiar que steja com um campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/residente_familiar')
                .send(MOCK_RESIDENTE_FAMILIAR_ERROR)
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
        it('Deve apagar um residente familiar dado seu ID', (done) => {
            chai.request(app)
                .delete(`/residente_familiar/${MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })
})