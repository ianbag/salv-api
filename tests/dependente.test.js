/**
 * author: NathanBarsoti8
 */

 const chai = require('chai')
 const chaiHttp = require('chai-http')
 const expect = chai.expect
 chai.use(chaiHttp)

 const app = require('./../app')
 const { DependenteModel } = require('./../app/models')

 const MOCK_DEPENDENTE_DEFAULT = {
    NOME: 'Nathan',
    SOBRENOME: 'Barsoti',
    DATA_NASCIMENTO: '1998-01-01',
    RG: '589785541',
    CPF: '64512301897',
    NUMERO_CERTIDAO_NASCIMENTO: '94512',
    FOLHA_CERTIDAO_NASCIMENTO: '12345',
    LIVRO_CERTIDAO_NASCIMENTO: '123',
    CIDADE_CERTIDAO_NASCIMENTO: 'Itápolis',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
 }

 const MOCK_DEPENDENTE_CADASTRAR = {
    NOME: 'Natalia',
    SOBRENOME: 'Lemos',
    DATA_NASCIMENTO: '1994-02-04',
    RG: '965478123',
    CPF: '46215798103',
    NUMERO_CERTIDAO_NASCIMENTO: '51322',
    LIVRO_CERTIDAO_NASCIMENTO: '173',
    CIDADE_CERTIDAO_NASCIMENTO: 'Ibirópolis',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
 }

 const MOCK_DEPENDENTE_ERROR = {
    SOBRENOME: 'Porto',
    DATA_NASCIMENTO: '1994-10-01',
    RG: '547162589',
    CPF: '30189763247',
    NUMERO_CERTIDAO_NASCIMENTO: '97845',
    FOLHA_CERTIDAO_NASCIMENTO: '65432',
    LIVRO_CERTIDAO_NASCIMENTO: '987',
    CIDADE_CERTIDAO_NASCIMENTO: 'Catanduva',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
 }

 const MOCK_DEPENDENTE_ATUALIZAR = {
    NOME: 'Leonardo',
    SOBRENOME: 'Azevedo',
    DATA_NASCIMENTO: '2000-01-20',
    RG: '123951753',
    CPF: '98475365130',
    NUMERO_CERTIDAO_NASCIMENTO: '98741',
    FOLHA_CERTIDAO_NASCIMENTO: '67812',
    LIVRO_CERTIDAO_NASCIMENTO: '788',
    CIDADE_CERTIDAO_NASCIMENTO: 'Itápolis',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
 }

 let MOCK_DEPENDENTE_CODIGO

 //Início dos tests

 describe('TDD Dependente', function() {
    this.beforeAll(async () => {

        const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)

        console.log('Add valores ao mock')
        MOCK_DEPENDENTE_DEFAULT.FUNCIONARIO.CODIGO = funcionario.CODIGO 

        const result = await DependenteModel.create(MOCK_DEPENDENTE_DEFAULT)

        MOCK_DEPENDENTE_FUNCIONARIO_CODIGO = result.FUNCIONARIO_CODIGO

        console.log('DEPENDENTE ' + MOCK_DEPENDENTE_FUNCIONARIO_CODIGO)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um dependente com base no ID dele (funcionario)', (done) => {
            chai.request(app)
                .get(`/dependente/${MOCK_DEPENDENTE_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_DEPENDENTE_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', () => {
        this.beforeAll(async () => {
            const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)

            console.log('Add valores ao mock')
            MOCK_DEPENDENTE_CADASTRAR.FUNCIONARIO_CODIGO = funcionario.CODIGO
        })

        it('Deve adicionar um dependente a um funcionaio no banco de dados', (done) => {
            chai.request(app)
                .post('/usuario')
                .send(MOCK_DEPENDENTE_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_DEPENDENTE_CADASTRAR)
                    done()
                })
        })

        this.beforeAll(async () => {
            const funcionaio = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)

            console.log('Add valores ao mock')
            MOCK_DEPENDENTE_ERROR.FUNCIONARIO_CODIGO = funcionaio.CODIGO
        })

        it('Deve retornar erro ao tentar adicionar um dependente que esteja com campo obrigatório em branco', (done) => {
            chai.request(app)
                .post('/usuario')
                .send(MOCK_DEPENDENTE_ERROR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('FOLHA_CERTIDAO_NASCIMENTO')
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
            MOCK_DEPENDENTE_CADASTRAR.FUNCIONARIO_CODIGO = funcionario.CODIGO
        })

        it('Atualizar os dados do dependente de acordo com o seu id', (done) => {
            chai.request(app)
                .put(`/dependente/${MOCK_DEPENDENTE_FUNCIONARIO_CODIGO}`)
                .send(MOCK_DEPENDENTE_ATUALIZAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

    //DELETE
    describe('/DELETE/ID: ', () => {
        it('Deve apagar um dependente com base no seu id', (done) => {
            chai.request(app)
                .delete(`/dependente/${MOCK_DEPENDENTE_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(1)
                    done()
                })
        })
    })

 })