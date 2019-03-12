/**
 * author: NathanBarsoti8
 */

 const chai = require('chai')
 const chaiHttp = require('chai-http')
 const expect = chai.expect
 chai.use(chaiHttp)

 const app = require('./../app')
 const { UsuarioModel, FuncionarioModel, PessoaModel } = require('./../app/models')

 let MOCK_USUARIO_DEFAULT = {
    CODIGO_FUNCIONARIO: null,
    EMAIL: Math.floor(Math.random() * 9999999) + '@gmail.com',
    LOGIN: Math.floor(Math.random() * 9999999) + 'nathan',
    SENHA: Math.floor(Math.random() * 9999999) + '123456'
 }

 let MOCK_USUARIO_CADASTRAR = {
    CODIGO_FUNCIONARIO: null,
    EMAIL: Math.floor(Math.random() * 9999999) + '@gmail.com',
    LOGIN: Math.floor(Math.random() * 9999999) + 'joana',
    SENHA: Math.floor(Math.random() * 9999999) + '123456'
 }

 const MOCK_USUARIO_ATUALIZAR = {
    CODIGO_FUNCIONARIO: null,
    EMAIL: Math.floor(Math.random() * 9999999) + '@gmail.com',
    LOGIN: Math.floor(Math.random() * 9999999)+'paula',
    SENHA: Math.floor(Math.random() * 9999999) + '123456'
 }

 let MOCK_USUARIO_CODIGO

 
 let MOCK_FUNCIONARIO_DEFAULT = {
    FILHOS_MENOR_14: 's',
    CARGO: 'Fisioterapeuta',
    DATA_ADMISSAO: '2010-01-29',
    DATA_DEMISSAO: '2015-12-20',
    PESSOA_CODIGO: null,
}

// MOCK DEFAULT PESSOA
const MOCK_PESSOA_DEFAULT = {
    NOME: 'Ian',
    SOBRENOME: 'Rotondo Bagliotti',
    RG: Math.floor(Math.random() * 999999999),
    CPF: Math.floor(Math.random() * 999999999),
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

 //Início dos tests

 
describe('TDD Usuario', function () {
    this.beforeAll(async () => {
        // const getAll = await UsuarioModel.findAll({ raw: true })
        // .then(usuario => console.log('USUARIO LOG GET ALL: ', usuario))
        // .catch(error => res.json(error))


        const pessoa = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_FUNCIONARIO_DEFAULT.PESSOA_CODIGO = pessoa.CODIGO
        //console.log("pessoa", pessoa)

        const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)
        MOCK_USUARIO_DEFAULT.CODIGO_FUNCIONARIO = funcionario.CODIGO_FUNCIONARIO
        MOCK_USUARIO_ATUALIZAR.CODIGO_FUNCIONARIO = funcionario.CODIGO_FUNCIONARIO
        //console.log("funcionario",funcionario)

        const usuario = await UsuarioModel.create(MOCK_USUARIO_DEFAULT)
        MOCK_USUARIO_FUNCIONARIO_CODIGO = usuario.CODIGO_FUNCIONARIO
        //console.log("usuario", usuario)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um usuario com base no ID dele (funcionario)', (done) => {
            chai.request(app)
                .get(`/usuario/${MOCK_USUARIO_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    //console.log('result', result)
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_USUARIO_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', function() {
        this.beforeAll(async () => {
            const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)
            MOCK_USUARIO_CADASTRAR.CODIGO_FUNCIONARIO = funcionario.CODIGO_FUNCIONARIO
        })
        it('Deve adicionar um usuario a um funcionario no banco de dados', (done) => {
            chai.request(app)
                .post('/usuario')
                .send(MOCK_USUARIO_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_USUARIO_CADASTRAR)
                    done()
                })
        })

        it('Deve retornar erro ao tentar adicionar um usuario que esteja com campo obrigatório em branco', (done) => {
            delete MOCK_USUARIO_CADASTRAR.EMAIL
            chai.request(app)
                .post('/usuario')
                .send(MOCK_USUARIO_CADASTRAR)
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
            MOCK_USUARIO_CADASTRAR.CODIGO_FUNCIONARIO = funcionario.CODIGO
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
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

})