/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:46:29
 * @modify date 2019-02-19 11:46:29
 * @desc Arquivo de testes da API de Beneficio
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

const { PessoaModel, BeneficioModel, ResidenteModel } = require('./../app/models')
const app = require('./../app')

const generateNumber9 = () => String(Math.floor(Math.random() * 999999999))
const generateNumber5 = () => String(Math.floor(Math.random() * 99999))

let MOCK_BENEFICIO_NOME

let MOCK_BENEFICIO_DEFAULT = {
    NOME_BENEFICIO: 'APOSENTADORIA',
    CODIGO_RESIDENTE: null,
    BANCO_BENEFICIO: 'Banco do Brasil',
    AGENCIA_BENEFICIO: '0001',
    CONTA_BENEFICIO: '00248764 4',
    VALOR_BENEFICIO: 1024.00,
    PROVA_VIDA_BENEFICIO: '2019-05-09'
}

let MOCK_BENEFICIO_CADASTRAR = {
    NOME_BENEFICIO: 'INVALIDEZ',
    CODIGO_RESIDENTE: null,
    BANCO_BENEFICIO: 'Santander',
    AGENCIA_BENEFICIO: '0123',
    CONTA_BENEFICIO: '125214512 6',
    VALOR_BENEFICIO: 2058.50,
    PROVA_VIDA_BENEFICIO: '2020-08-22'
}

let MOCK_BENEFICIO_ATUALIZAR = {
    NOME_BENEFICIO: 'APOSENTADORIA',
    CODIGO_RESIDENTE: null,
    BANCO_BENEFICIO: 'Bradesco',
    AGENCIA_BENEFICIO: '125421',
    CONTA_BENEFICIO: '5152151 8',
    VALOR_BENEFICIO: 965.50,
    PROVA_VIDA_BENEFICIO: '2019-09-22'
}

// MOCK DOS RELACIONAMENTOS
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

describe('TDD Beneficio', function () {
    this.beforeAll(async () => {
        const pessoaCadastrado = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_RESIDENTE_DEFAULT.PESSOA_CODIGO = pessoaCadastrado.CODIGO
        console.log("pessoaCadastrado", pessoaCadastrado)
     
        const residenteCadastrado = await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
        MOCK_BENEFICIO_DEFAULT.CODIGO_RESIDENTE = residenteCadastrado.CODIGO_RESIDENTE
        MOCK_BENEFICIO_CADASTRAR.CODIGO_RESIDENTE = residenteCadastrado.CODIGO_RESIDENTE
        MOCK_BENEFICIO_ATUALIZAR.CODIGO_RESIDENTE = residenteCadastrado.CODIGO_RESIDENTE
        console.log("residenteCadastrado",residenteCadastrado)

       const beneficioCadastrado = await BeneficioModel.create(MOCK_BENEFICIO_DEFAULT)
       MOCK_BENEFICIO_NOME = beneficioCadastrado.NOME_BENEFICIO
       console.log("beneficioCadastrado", beneficioCadastrado)
    })

    describe('/GET: ', () => {
        it('Deve retornar os Beneficios existente no banco de dados', (done) => {
            chai.request(app)
                .get('/beneficio')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.STATUS
                    expect(result).to.eql(MOCK_BENEFICIO_DEFAULT)
                    expect(res.statusCode).to.eql(200)
                    done()
                })
        })
    })

    describe('/GET/NOME: ', () => {
        it('Deve retornar um Beneficios pelo NOME', (done) => {
            chai.request(app)
                .get(`/beneficio/${MOCK_BENEFICIO_NOME}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_BENEFICIO_DEFAULT)
                    done()
                })
        })
    })

    describe('/POST: ', () => {
        it('Deve adicionar um Beneficios no banco de dados', (done) => {
            chai.request(app)
                .post('/beneficio')
                .send(MOCK_BENEFICIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.STATUS
                    expect(result).to.eql(MOCK_BENEFICIO_CADASTRAR)
                    expect(res.statusCode).to.eql(200)
                    done()
                })
        })

        it('Deve retornar erro ao adicionar Beneficio, por faltar o campo NOME_BENEFICIO', (done) => {
            delete MOCK_BENEFICIO_CADASTRAR.NOME_BENEFICIO
            chai.request(app)
                .post('/beneficio')
                .send(MOCK_BENEFICIO_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('NOME_BENEFICIO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    describe('/PUT: ', () => {
        it('Deve atualizar uma pessoa pelo NOME: ', (done) => {
            chai.request(app)
                .put(`/beneficio/${MOCK_BENEFICIO_NOME}`)
                .send(MOCK_BENEFICIO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])

                    done()
                })
        })
    })

    describe('/DELETE: ', () => {
        it('Deve atualizar uma pessoa pelo NOME: ', (done) => {
            chai.request(app)
                .delete(`/beneficio/${MOCK_BENEFICIO_NOME}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })
})