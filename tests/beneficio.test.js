/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:46:29
 * @modify date 2019-02-19 12:14:08
 * @desc Arquivo de testes da API de Beneficio
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

const { BeneficioModel } = require('./../app/models')
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


describe('TDD Beneficio', function(){
    this.beforeAll(async() => {
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

})