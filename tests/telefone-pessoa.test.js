/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:50:35
 * @modify date 2019-02-20 20:11:41
 * @desc Arquivo de Testes da API de Telefone Pessoa
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { TelefonePessoaModel, PessoaModel, TelefoneModel } = require('./../app/models')

const MOCK_TELEFONE_DEFAULT = {
    DDD: '16',
    NUMERO: '982706173'
}

let MOCK_PESSOA_DEFAULT = {
    NOME: 'Rodoaldo',
    SOBRENOME: 'Silva Cruz',
    RG: Math.floor(Math.random() * 999999999),
    CPF: Math.floor(Math.random() * 999999999),
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1991-04-17',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc'
}

let MOCK_TELEFONE_PESSOA_DEFAULT = {
    PESSOA_CODIGO: null,
    TELEFONE_CODIGO: null
}

let MOCK_TELEFONE_PESSOA_CADASTRAR = {
    PESSOA_CODIGO: null,
    TELEFONE_CODIGO: null
}

let MOCK_TELEFONE_PESSOA_CODIGO

describe.only('TDD Telefone Pessoa: ', function () {
    this.beforeAll(async () => {
        const telefoneCadastrado = await TelefoneModel.create(MOCK_TELEFONE_DEFAULT)
        MOCK_TELEFONE_PESSOA_DEFAULT.TELEFONE_CODIGO = telefoneCadastrado.CODIGO

        const pessoaCadastrado = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_TELEFONE_PESSOA_DEFAULT.PESSOA_CODIGO = pessoaCadastrado.CODIGO
        //console.log('MOCK_TELEFONE_PESSOA_DEFAULT', MOCK_TELEFONE_PESSOA_DEFAULT)

        const telefonePessoaCadastrado = await TelefonePessoaModel.create(MOCK_TELEFONE_PESSOA_DEFAULT)
        MOCK_TELEFONE_PESSOA_CODIGO = telefonePessoaCadastrado.PESSOA_CODIGO
        //console.log('MOCK_TELEFONE_PESSOA_CODIGO', MOCK_TELEFONE_PESSOA_CODIGO)
    })

    describe('/GET/ID: ', () => {
        it('Deve retornar o telefone da pessoa pelo ID', (done) => {
            chai.request(app)
                .get(`/telefone-pessoa/${MOCK_TELEFONE_PESSOA_CODIGO}`)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(MOCK_TELEFONE_PESSOA_DEFAULT)
                    done()
            })
        })
    })

    describe('/POST: ', () => {
        this.beforeEach(async () => {
        const telefoneCadastrado = await TelefoneModel.create(MOCK_TELEFONE_DEFAULT)
        MOCK_TELEFONE_PESSOA_CADASTRAR.TELEFONE_CODIGO = telefoneCadastrado.CODIGO

        // alterando dados únicos de RG e CPF
        MOCK_PESSOA_DEFAULT.RG = Math.floor(Math.random() * 999999999);
        MOCK_PESSOA_DEFAULT.CPF = Math.floor(Math.random() * 999999999);

        const pessoaCadastrado = await PessoaModel.create(MOCK_PESSOA_DEFAULT)
        MOCK_TELEFONE_PESSOA_CADASTRAR.PESSOA_CODIGO = pessoaCadastrado.CODIGO
        })
        it('Deve adicionar um Telefone Pessoa no banco de dados' , (done) => {
            chai.request(app)
                .post('/telefone-pessoa')
                .send(MOCK_TELEFONE_PESSOA_CADASTRAR)
                .end((error, res) => {
                    expect(res.statusCode).to.eql(200)
                    expect(res.body).to.eql(MOCK_TELEFONE_PESSOA_CADASTRAR)
                    done()
            })
        })

        it('Deve retornar erro ao tentar adicionar um Telefone Pessoa com campo obrigatório faltante', (done) => {
            delete MOCK_TELEFONE_PESSOA_CADASTRAR.PESSOA_CODIGO
            chai.request(app)
                .post('/telefone-pessoa')
                .send(MOCK_TELEFONE_PESSOA_CADASTRAR)
                .end((error, res) => {
                    const [result] = res.body.errors
                    expect(res.statusCode).to.eql(200)
                    expect(result.path).to.eql('PESSOA_CODIGO')
                    expect(result.type).to.eql('notNull Violation')
                    done()
            })
        })
    })
})