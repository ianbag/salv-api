/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:27:46
 * @modify date 2019-02-18 20:19:16
 * @desc Arquivo de testes da API de Residente
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

const { ResidenteModel, PessoaModel } = require('./../app/models')
const app = require('./../app')

const MOCK_PESSOA_DEFAULT = {
    CODIGO: 1,
    NOME: 'Ian',
    SOBRENOME: 'Rotondo Bagliotti',
    RG: '468915217',
    CPF: '84404069405',
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
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

const MOCK_RESIDENTE_CADASTRAR = {
    APELIDO: 'Rodoaldo',
    PROFISSAO: 'Ferreiro',
    TITULO_ELEITOR: '51511',
    ZONA_ELEITORAL: '313',
    SECAO_ELEITORAL: '22',
    NUMERO_CERTIDAO_NASCIMENTO: '5413',
    FOLHA_CERTIDAO_NASCIMENTO: '11',
    LIVRO_CERTIDAO_NASCIMENTO: '3',
    CIDADE_CERTIDAO_NASCIMENTO: 'Matão',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP',
    CARTAO_SAMS: '515132213',
    CARTAO_SUS: '14516516461',
    NUMERO_INSS: '321',
    BANCO_INSS: 'Bradesco',
    AGENCIA_INSS: '0005',
    CONTA_INSS: '51515151 4',
    VALOR_INSS: 2500.00,
    SITUACAO_INSS: 'BCP',
    PROVA_VIDA_INSS: '2019-03-15',
    DATA_ACOLHIMENTO: '2017-02-03',
    DATA_DESACOLHIMENTO: null,
    MOTIVO_DESACOLHIMENTO: null,
    PESSOA_CODIGO: 1
}

const MOCK_RESIDENTE_ATUALIZAR = {
    APELIDO: 'MA',
    PROFISSAO: 'Advogada',
    TITULO_ELEITOR: '5151251',
    ZONA_ELEITORAL: '1DB',
    SECAO_ELEITORAL: '55',
    NUMERO_CERTIDAO_NASCIMENTO: '512',
    FOLHA_CERTIDAO_NASCIMENTO: '12',
    LIVRO_CERTIDAO_NASCIMENTO: '3',
    CIDADE_CERTIDAO_NASCIMENTO: 'Jaboticabal',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP',
    CARTAO_SAMS: '512321321',
    CARTAO_SUS: '61231512',
    NUMERO_INSS: '421',
    BANCO_INSS: 'Caixa',
    AGENCIA_INSS: '0009',
    CONTA_INSS: '89182398 1',
    VALOR_INSS: 2500.47,
    SITUACAO_INSS: 'BCP',
    PROVA_VIDA_INSS: '2019-09-30',
    DATA_ACOLHIMENTO: '2019-01-30',
    DATA_DESACOLHIMENTO: null,
    MOTIVO_DESACOLHIMENTO: null,
    PESSOA_CODIGO: 1
}

let MOCK_RESIDENTE_CODIGO

describe('TDD Residente:', function (){
    this.beforeAll(async () => {
        await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        const result = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
        MOCK_RESIDENTE_CODIGO = result.CODIGO_RESIDENTE
    })
    describe('/GET: ', () => {
        it('Deve retornar os Residentes adicionados', (done) => {
            chai.request(app)
                .get('/residente')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO_RESIDENTE
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_DEFAULT)
                    done()
            })
        })
    })

    describe('/GET/ID: ', () => {
        it('Deve retornar um Residente pelo ID', (done) => {
            chai.request(app)
                .get(`/residente/${MOCK_RESIDENTE_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO_RESIDENTE
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_DEFAULT)
                    done()
            })
        })
    })

    describe('/POST: ', () => {
        it('Deve adicionar um Residente', (done) => {
            chai.request(app)
                .post('/residente')
                .send(MOCK_RESIDENTE_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO_RESIDENTE
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_RESIDENTE_CADASTRAR)
                    done()
            })
        })
        it('Deve retornar erro ao adicionar Residente, por faltar a data de acolhimento', (done) => {
            delete MOCK_RESIDENTE_CADASTRAR.DATA_ACOLHIMENTO
            chai.request(app)
                .post('/residente')
                .send(MOCK_RESIDENTE_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('DATA_ACOLHIMENTO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
            })
        })
    })

    describe('/PUT/ID: ', () => {
        it('Deve atualizar um residente pelo ID', (done) => {
            chai.request(app)
                .put(`/residente/${MOCK_RESIDENTE_CODIGO}`)
                .send(MOCK_RESIDENTE_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
            })
        })
    })

    describe('/DELETE/ID: ', () => {
        it('Deve deletar um Residente pelo ID', (done) => {
            chai.request(app)
                .delete(`/residente/${MOCK_RESIDENTE_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
            })
        })
    })
})