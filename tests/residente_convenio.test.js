const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { ResidenteConvenioModel, ConvenioModel, ResidenteModel, PessoaModel } = require('./../app/models')

const generateNumber9 = () => String(Math.floor(Math.random() * 999999999))
const generateNumber5 = () => String(Math.floor(Math.random() * 99999))
const generateNumber11 = () => Math.floor(Math.random() * 999999999)

//INICIANDO MOCKS

let MOCK_RESIDENTE_CONVENIO_DEFAULT = {
    NUMERO_CONVENIO: generateNumber11(),
    RESIDENTE_CODIGO: null,
    TITULAR_CONVENIO: 'Ian',
    PARENTESCO_TITULAR: null,
    CONVENIO_CODIGO: null
}

let MOCK_RESIDENTE_CONVENIO_CADASTRAR = {
    NUMERO_CONVENIO: generateNumber11(),
    RESIDENTE_CODIGO: null,
    TITULAR_CONVENIO: 'Ian',
    PARENTESCO_TITULAR: null,
    CONVENIO_CODIGO: null
}

const MOCK_CONVENIO_DEFAULT = {
    NOME_CONVENIO: 'Ossos mais',
    TIPO_CONVENIO: 'Ortopedista'
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

let MOCK_RESIDENTE_CONVENIO_CODIGO

//FINALIZANDO MOCKS

//TESTS

describe('Test Driven Development SALV-API Residente Convenio', function () {
    this.beforeAll(async () => {
        const pessoa = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_RESIDENTE_DEFAULT.PESSOA_CODIGO = pessoa.CODIGO

        const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)
        MOCK_RESIDENTE_CONVENIO_DEFAULT.CONVENIO_CODIGO = convenio.CODIGO
        MOCK_RESIDENTE_CONVENIO_CADASTRAR.CONVENIO_CODIGO = convenio.CODIGO

        const residente = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
        MOCK_RESIDENTE_CONVENIO_DEFAULT.RESIDENTE_CODIGO = residente.CODIGO_RESIDENTE
        MOCK_RESIDENTE_CONVENIO_CADASTRAR.RESIDENTE_CODIGO = residente.CODIGO_RESIDENTE

        const result = await ResidenteConvenioModel.create(MOCK_RESIDENTE_CONVENIO_DEFAULT)
        MOCK_RESIDENTE_CONVENIO_CODIGO = result.CONVENIO_CODIGO
    })
    
    describe('/GET/ID :', () => {
        it('Deve retornar um Residente Convenio dado o ID do CODIGO_RESIDENTE', (done) => {
            chai.request(app)
            .get(`/residente_convenio/${MOCK_RESIDENTE_CONVENIO_CODIGO}`)
            .end((error, res) => {
                const result = res.body
                delete result.STATUS
                expect(res.statusCode).to.eql(200)
                expect(result).to.eql(MOCK_RESIDENTE_CONVENIO_DEFAULT)
                done()
            })
        })
    })

    //POST
    describe('/POST: ', function () {
        this.beforeAll(async () => {
            const convenio = await ConvenioModel.create(MOCK_CONVENIO_DEFAULT)
            MOCK_RESIDENTE_CONVENIO_CADASTRAR.CONVENIO_CODIGO = convenio.CODIGO
        })

        it('Deve adicionar um residente a um convenio na base de dados', (done) => {
            chai.request(app)
                .post('/residente_convenio')
                .send(MOCK_RESIDENTE_CONVENIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_CONVENIO_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um residente convenio que esteja com um campo obrigatório em branco', (done) => {
            delete MOCK_RESIDENTE_CONVENIO_CADASTRAR.TITULAR_CONVENIO
            chai.request(app)
                .post('/residente_convenio')
                .send(MOCK_RESIDENTE_CONVENIO_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('TITULAR_CONVENIO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um residente convenio dado seu ID', (done) => {
            chai.request(app)
                .delete(`/residente_convenio/${MOCK_RESIDENTE_CONVENIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })
})