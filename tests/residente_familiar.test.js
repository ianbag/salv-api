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
const { ResidenteFamiliarModel,
        FamiliarModel,
        ResidenteModel,
        PessoaModel } = require('./../app/models')

const generateNumber9 = () => String(Math.floor(Math.random() * 999999999))
const generateNumber5 = () => String(Math.floor(Math.random() * 99999))

//INICIANDO MOCKS

let MOCK_RESIDENTE_FAMILIAR_DEFAULT = {
    FAMILIAR_CODIGO: null,
    RESIDENTE_CODIGO: null
}

let MOCK_RESIDENTE_FAMILIAR_CADASTRAR = {
    FAMILIAR_CODIGO: null,
    RESIDENTE_CODIGO: null
}

const MOCK_FAMILIAR_DEFAULT = {
    NOME: 'PAMELA',
    SOBRENOME: 'CRISTINA',
    PARENTESCO: 'SOBRINHA'
}

const MOCK_PESSOA_DEFAULT = {
    NOME: 'Ian',
    SOBRENOME: 'Rotondo Bagliotti',
    RG: generateNumber9(),
    CPF: generateNumber9(),
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

let MOCK_RESIDENTE_DEFAULT = {
    APELIDO: 'Lobo',
    PROFISSAO: 'Analista e Desenvolvedor de Sistemas',
    TITULO_ELEITOR: generateNumber9(),
    ZONA_ELEITORAL: '3AB',
    SECAO_ELEITORAL: '11',
    NUMERO_CERTIDAO_NASCIMENTO: generateNumber5(),
    FOLHA_CERTIDAO_NASCIMENTO: '22',
    LIVRO_CERTIDAO_NASCIMENTO: '5',
    CIDADE_CERTIDAO_NASCIMENTO: 'Taquaritinga',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP',
    CARTAO_SAMS: generateNumber9(),
    CARTAO_SUS: generateNumber9(),
    NUMERO_INSS: generateNumber9(),
    BANCO_INSS: 'Banco do Brasil',
    AGENCIA_INSS: '0001',
    CONTA_INSS: generateNumber9(),
    VALOR_INSS: 1000.50,
    SITUACAO_INSS: 'BCP',
    PROVA_VIDA_INSS: '2019-02-27',
    DATA_ACOLHIMENTO: '2018-05-07',
    DATA_DESACOLHIMENTO: null,
    MOTIVO_DESACOLHIMENTO: null,
    PESSOA_CODIGO: null
}

let MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO

//FINALIZANDO MOCKS

//TESTS

describe('Test Driven Development SALV-API Residente Familiar', function () {
    this.beforeAll(async () => {
        const pessoa = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_RESIDENTE_DEFAULT.PESSOA_CODIGO = pessoa.CODIGO

        const familiar = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)
        MOCK_RESIDENTE_FAMILIAR_DEFAULT.FAMILIAR_CODIGO = familiar.CODIGO

        const residente = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
        MOCK_RESIDENTE_FAMILIAR_DEFAULT.RESIDENTE_CODIGO = residente.CODIGO_RESIDENTE
        MOCK_RESIDENTE_FAMILIAR_CADASTRAR.RESIDENTE_CODIGO = residente.CODIGO_RESIDENTE

        const residenteFamiliar = await ResidenteFamiliarModel.create(MOCK_RESIDENTE_FAMILIAR_DEFAULT)
        MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO = residenteFamiliar.FAMILIAR_CODIGO

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
    describe('/POST: ', function () {
        this.beforeAll(async () => {
            const familiar = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)
            MOCK_RESIDENTE_FAMILIAR_CADASTRAR.FAMILIAR_CODIGO = familiar.CODIGO
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

         it('Deve retornar erro ao tentar adicionar um residente familiar que esteja com um campo obrigatório em branco', (done) => {
            delete MOCK_RESIDENTE_FAMILIAR_CADASTRAR.RESIDENTE_CODIGO
            chai.request(app)
                .post('/residente_familiar')
                .send(MOCK_RESIDENTE_FAMILIAR_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('RESIDENTE_CODIGO')
                    expect(result.type).to.eql('notNull Violation')
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