/**
 * author: NathanBarsoti8
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { DependenteModel,
    FuncionarioModel,
    PessoaModel } = require('./../app/models')

const generateNumber9 = () => String(Math.floor(Math.random() * 999999999))
const generateNumber5 = () => String(Math.floor(Math.random() * 99999))

let MOCK_DEPENDENTE_DEFAULT = {
    CODIGO_FUNCIONARIO: null,
    NOME: 'Nathan',
    SOBRENOME: 'Barsoti',
    DATA_NASCIMENTO: '1998-01-01',
    RG: generateNumber9(),
    CPF: generateNumber9(),
    NUMERO_CERTIDAO_NASCIMENTO: generateNumber5(),
    FOLHA_CERTIDAO_NASCIMENTO: '12345',
    LIVRO_CERTIDAO_NASCIMENTO: '123',
    CIDADE_CERTIDAO_NASCIMENTO: 'Itápolis',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
}

let MOCK_DEPENDENTE_CADASTRAR = {
    CODIGO_FUNCIONARIO: null,
    NOME: 'Natalia',
    SOBRENOME: 'Lemos',
    DATA_NASCIMENTO: '1994-02-04',
    RG: generateNumber9(),
    CPF: generateNumber9(),
    NUMERO_CERTIDAO_NASCIMENTO: generateNumber5(),
    LIVRO_CERTIDAO_NASCIMENTO: '173',
    CIDADE_CERTIDAO_NASCIMENTO: 'Ibirópolis',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
}

let MOCK_DEPENDENTE_ATUALIZAR = {
    CODIGO_FUNCIONARIO: null,
    NOME: 'Leonardo',
    SOBRENOME: 'Azevedo',
    DATA_NASCIMENTO: '2000-01-20',
    RG: generateNumber9(),
    CPF: generateNumber9(),
    NUMERO_CERTIDAO_NASCIMENTO: generateNumber5(),
    FOLHA_CERTIDAO_NASCIMENTO: '67812',
    LIVRO_CERTIDAO_NASCIMENTO: '788',
    CIDADE_CERTIDAO_NASCIMENTO: 'Itápolis',
    ESTADO_CERTIDAO_NASCIMENTO: 'SP'
}


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
    RG: generateNumber9(),
    CPF: generateNumber9(),
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '2000-01-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

let MOCK_DEPENDENTE_CODIGO

//Início dos tests

describe('TDD Dependente', function () {
    this.beforeAll(async () => {
        const pessoa = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_FUNCIONARIO_DEFAULT.PESSOA_CODIGO = pessoa.CODIGO

        const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)
        MOCK_DEPENDENTE_DEFAULT.CODIGO_FUNCIONARIO = funcionario.CODIGO_FUNCIONARIO
        MOCK_DEPENDENTE_ATUALIZAR.CODIGO_FUNCIONARIO = funcionario.CODIGO_FUNCIONARIO

        const dependente = await DependenteModel.create(MOCK_DEPENDENTE_DEFAULT)
        MOCK_DEPENDENTE_FUNCIONARIO_CODIGO = dependente.CODIGO_FUNCIONARIO
        //console.log('dependente', dependente)
    })

    //GET ID
    describe('/GET/ID: ', () => {
        it('Deve retornar um dependente com base no ID dele (funcionario)', (done) => {
            chai.request(app)
                .get(`/dependente/${MOCK_DEPENDENTE_FUNCIONARIO_CODIGO}`)
                .end((error, res) => {
                    const result = res.body
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_DEPENDENTE_DEFAULT)
                    done()
                })
        })
    })

    //POST
    describe('/POST: ', function () {
        this.beforeAll(async () => {
            const funcionario = await FuncionarioModel.create(MOCK_FUNCIONARIO_DEFAULT)
            MOCK_DEPENDENTE_CADASTRAR.CODIGO_FUNCIONARIO = funcionario.CODIGO_FUNCIONARIO

        })

        it('Deve adicionar um dependente a um funcionaio no banco de dados', (done) => {
            chai.request(app)
                .post('/dependente')
                .send(MOCK_DEPENDENTE_CADASTRAR)
                .end((error, res) => {
                    const result = res.body
                    delete result.STATUS
                    expect(res.statusCode).to.eql(200)
                    expect(result).to.eql(MOCK_DEPENDENTE_CADASTRAR)
                    done()
                })
        })
        it('Deve retornar erro ao tentar adicionar um dependente que tenha primary key repetida', (done) => {
            chai.request(app)
                .post('/dependente')
                .send(MOCK_DEPENDENTE_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('PRIMARY')
                    expect(result.type).to.eql('unique violation')
                    done()
                })
        })
    })

    //PUT
    describe('/PUT/ID: ', () => {
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
                    expect(res.body).to.eql([1])
                    done()
                })
        })
    })

})