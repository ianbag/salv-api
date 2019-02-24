/**
 * author: NathanBarsoti8
 */

 const chai = require('chai')
 const chaiHttp = require('chai-http')
 const expect = chai.expect
 chai.use(chaiHttp)

 const app = require('./../app')
 const { UsuarioModel } = require('./../app/models')

 const MOCK_USUARIO_DEFAULT = {
    EMAIL: 'nathanbarsoti@hotmail.com',
    LOGIN: 'nathanbarsoti',
    SENHA: '123456'
 }

 const MOCK_USUARIO_CADASTRAR = {
    EMAIL: 'joanaportora@hotmail.com',
    LOGIN: 'joanaportora',
    SENHA: '123456'
 }

 const MOCK_USUARIO_ERROR = {
    LOGIN: 'joaomerchan',
    SENHA: '123456'
 }

 const MOCK_USUARIO_ATUALIZAR = {
    EMAIL: 'paulabrosvky@hotmail.com',
    LOGIN: 'paulabrosvky',
    SENHA: '123456'
 }

 let MOCK_USUARIO_CODIGO

 //Início dos tests

 
describe('TDD Usuario', function () {
    this.beforeAll(async () => {

        const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT) 

        console.log('Add valores ao mock')
        MOCK_USUARIO_DEFAULT.FUNCIONARIO_CODIGO = funcionario.CODIGO

        const result = await UsuarioModel.create(MOCK_USUARIO_DEFAULT)

        MOCK_USUARIO_FUNCIONARIO_CODIGO = result.FUNCIONARIO_CODIGO

        console.log('USUARIO ' + MOCK_USUARIO_FUNCIONARIO_CODIGO)        
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um usuario com base no ID dele (funcionario)', (done) => {
            chai.request(app)
                .get(`/usuario/${MOCK_USUARIO_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_USUARIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        this.beforeAll(async () => {
            const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)

            console.log('Add valores ao mock')
            MOCK_USUARIO_CADASTRAR.FUNCIONARIO_CODIGO = funcionario.CODIGO
        })

        it('Deve adicionar um usuario a um funcionaio no banco de dados', (done) => {
            chai.request(app)
                .post('/usuario')
                .send(MOCK_USUARIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_USUARIO_CADASTRAR)
                    done()
                })
        })

        this.beforeAll(async () => {
            const funcionaio = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)

            console.log('Add valores ao mock')
            MOCK_USUARIO_ERROR.FUNCIONARIO_CODIGO = funcionaio.CODIGO
        })

        it('Deve retornar erro ao tentar adicionar um usuario que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/usuario')
                .send(MOCK_USUARIO_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('EMAIL')
                    expect(result.type).to.eql('notNull Violation')
                    done()
                })
        })
    })

    //PUT
    describe('/PUT/ID: ', () => {
        this.beforeAll(async () => {
            const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)

            console.log('Add valores ao mock')
            MOCK_USUARIO_CADASTRAR.FUNCIONARIO_CODIGO = funcionario.CODIGO
        })

        it('Atualizar os dados do funcionario de acordo com o seu id', (done) => {
            chai.request(app)
                .put(`/usuario/${MOCK_USUARIO_FUNCIONARIO_CODIGO}`)
                .send(MOCK_USUARIO_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um usuario com base no seu id', (done) => {
            chai.request(app)
                .delete(`/usuario/${MOCK_USUARIO_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })

})