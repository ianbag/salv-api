/**
 * author: hppod
 * create: 18/02/2019 15h24
 * file: familiar.test.js
 * descrition: Arquivo de teste automatizado da API SALV. Métodos "familiar" testados
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { FamiliarModel } = require('./../app/models')

//MOCANOD VALORES

const MOCK_FAMILIAR_DEFAULT = {
    NOME: 'VALDECIR',
    SOBRENOME: 'MATOS',
    PARENTESCO: 'FILHO',
}

let MOCK_FAMILIAR_ERROR = {
    NOME: 'YARA',
    SOBRENOME: 'MARTINS'
}

const MOCK_FAMILIAR_ATUALIZAR = {
    NOME: 'RAFAEL',
    SOBRENOME: 'JORGE',
    PARENTESCO: 'SOBRINHO'
}

let MOCK_FAMILIAR_CODIGO

//INICIO DOS TESTES

describe('Test Driven Development SALV-API Familiar', function () {
    this.beforeAll(async () => {
        await FamiliarModel.destroy({ where: {} })
        const result = await FamiliarModel.create(MOCK_FAMILIAR_DEFAULT)
        MOCK_FAMILIAR_CODIGO = result.codigo
    })

    //TESTE GET ALL

    describe('/GET: ', () => {
        it('Deve retornar os familiares presentes na base de dados', (done) => {
            chai.request(app)
                .get('/familiar')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_FAMILIAR_DEFAULT)
                    done()
                })
        })
    })

    //TESTE GET ID

    describe('/GET/ID: ', () => {
        it('Deve retornar um familiar dado o ID dele', (done) => {
            chai.request(app)
                .get(`/familiar/${MOCK_FAMILIAR_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_FAMILIAR_DEFAULT)
                    done()
                })
        })
    })

    //TESTE POST

})