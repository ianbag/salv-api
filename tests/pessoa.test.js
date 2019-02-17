/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:30:44
 * @modify date 2019-02-17 13:28:47
 * @desc TDD Pessoas
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { PessoaModel } = require('./../app/models')

const MOCK_PESSOA_CADASTRAR = {
    NOME: 'Ian',
    SOBRENOME: 'Rotondo Bagliotti',
    RG: '468915217',
    CPF: '84404069405',
    SEXO: 'm',
    ESTADO_CIVIL: 'c',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

let MOCK_PESSOA_CODIGO

describe('TDD Pessoa', function () {
    this.beforeAll(async () => {
        await PessoaModel.destroy({ where: {} })
        const result = await PessoaModel.create(MOCK_PESSOA_CADASTRAR)
        MOCK_PESSOA_CODIGO = result.CODIGO
    })
    describe('/GET: ', () => {
        it('Deve retornar as Pessoas adicionadas', (done) => {
            chai.request(app).get('/pessoa')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_PESSOA_CADASTRAR)
                    done()
                })
        })
    })

    describe('/GET/ID: ', () => {
        it('Deve retornar uma Pessoa pelo ID', (done) => {
            chai.request(app).get(`/pessoa/${MOCK_PESSOA_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_PESSOA_CADASTRAR)
                    done()
                })
        })

    })
})