const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)


const app = require('./../app')
const {AcompanhamentosModel} = require('./../app/models')

const MOCK_ACOMPANHAMENTO_DEFAULT = {
    
    DATA_ACOMPANHAMENTO: '2011-02-19',
    ATIVIDADE: 'CAMINHADA'
}

const MOCK_ACOMPANHAMENTO_CADASTRAR = {
    
    DATA_ACOMPANHAMENTO: '2019-03-13',
    ATIVIDADE: 'BINGO'
}


const MOCK_ACOMPANHAMENTO_ATUALIZAR = {
    
    DATA_ACOMPANHAMENTO: '2015-06-12',
    ATIVIDADE: 'KAROAKE'
}

let MOCK_ACOMPANHAMENTO_CODIGO


//Início 

describe('Test Driven Development SALV-API acompanhamento', function () {
    this.beforeAll(async () => {
        const result = await AcompanhamentosModel.create(MOCK_ACOMPANHAMENTO_DEFAULT)
        MOCK_ACOMPANHAMENTO_CODIGO = result.CODIGO
    })


    //GET
    describe('/GET: ', () => {
        it('Deve retornar todos os acomp do banco de dados', (done) => {
            chai.request(app)
                .get('/acompanhamento')
                .end((error, res) => {
                    const [result] = res.body
                    delete result.CODIGO
                    expect(result).to.eql(MOCK_ACOMPANHAMENTO_DEFAULT)
                    done()
                })
        })
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um acompanhamento pelo id', (done) => {
            chai.request(app)
                .get(`/acompanhamento/${MOCK_ACOMPANHAMENTO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_ACOMPANHAMENTO_DEFAULT)
 
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        it('Deve adicionar um acomp no banco', (done) => {
            chai.request(app)
                .post('/acompanhamento')
                .send(MOCK_ACOMPANHAMENTO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.CODIGO
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_ACOMPANHAMENTO_CADASTRAR)
                    done()
                })
        })

   
    //PUT
    describe('/PUT/ID: ', () => {
        it('Atualizar os dados do acomp pelo ID', (done) => {
            chai.request(app)
                .put(`/acompanhamento/${MOCK_ACOMPANHAMENTO_CODIGO}`)
                .send(MOCK_ACOMPANHAMENTO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um pelo ID', (done) => {
            chai.request(app)
                .delete(`/acompanhamento/${MOCK_ACOMPANHAMENTO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })

})

})