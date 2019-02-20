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

const { BeneficioModel, ResidenteModel, PessoaModel } = require('./../app/models')
const app = require('./../app')

let MOCK_BENEFICIO_NOME

const MOCK_BENEFICIO_DEFAULT = {
    NOME_BENEFICIO: 'APOSENTADORIA',
    CODIGO_RESIDENTE: 1,
    BANCO_BENEFICIO: 'Banco do Brasil',
    AGENCIA_BENEFICIO: '0001',
    CONTA_BENEFICIO: '00248764 4',
    VALOR_BENEFICIO: 1024.00,
    PROVA_VIDA_BENEFICIO: '2019-05-09'
}

const MOCK_BENEFICIO_CADASTRAR = {
    NOME_BENEFICIO: 'INVALIDEZ',
    CODIGO_RESIDENTE: 1,
    BANCO_BENEFICIO: 'Santander',
    AGENCIA_BENEFICIO: '0123',
    CONTA_BENEFICIO: '125214512 6',
    VALOR_BENEFICIO: 2058.50,
    PROVA_VIDA_BENEFICIO: '2020-08-22'
}

// MOCK DOS RELACIONAMENTOS
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


describe.only('TDD Beneficio', function () {
    this.beforeAll(async () => {
        await BeneficioModel.destroy({ where: {} })
        await ResidenteModel.destroy({ where: {} })
        await PessoaModel.destory({ where: {} })
        await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        await ResidenteModel.create(MOCK_RESIDENTE_DEFAULT)
        const result = await BeneficioModel.create(MOCK_BENEFICIO_DEFAULT)
        MOCK_BENEFICIO_NOME = result.NOME_BENEFICIO
    })

    describe('/GET: ', () => {
        it('Deve retornar os Beneficios existente no banco de dados', (done) => {
            chai.request(app)
                .get('/beneficio')
                .end((error, res) => {
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

                    expect(res.statusCode).to.eql(200)
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

                    expect(res.statusCode).to.eql(200)
                    done()
                })
        })
    })

    describe('/PUT: ', () => {
        it('Deve atualizar uma pessoa pelo NOME: ', (done) => {
            chai.request(app)
                .put(`/beneficio/${MOCK_BENEFICIO_NOME}`)
                .send(MOCK_BENEFICIO_CADASTRAR)
                .end((error, res) => {

                    expect(res.statusCode).to.eql(200)
                    done()
                })
        })
    })

    describe('/DELETE: ', () => {
        it('Deve atualizar uma pessoa pelo NOME: ', (done) => {
            chai.request(app)
                .delete(`/beneficio/${MOCK_BENEFICIO_NOME}`)
                .send(MOCK_BENEFICIO_CADASTRAR)
                .end((error, res) => {

                    expect(res.statusCode).to.eql(200)
                    done()
                })
        })
    })
})