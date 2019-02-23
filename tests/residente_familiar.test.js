/**
 * author: hppod
 * create: 23/02/2019 00h53
 * file: residente_familiar.test.js
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { ResidenteFamiliarModel } = require('./../app/models')
const { FamiliarModel } = require('./../app/models')
const { ResidenteModel } = require('/../app/models')

//INICIANDO MOCKS

const MOCK_RESIDENTE_FAMILIAR_DEFAULT = {
    FAMILIAR_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_RESIDENTE_FAMILIAR_CADASTRAR = {
    FAMILIAR_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_RESIDENTE_FAMILIAR_ERROR = {
    FAMILIAR_CODIGO: null,
    CODIGO_RESIDENTE: null
}

const MOCK_FAMILIAR_DEFAULT = {
    NOME: 'PAMELA',
    SOBRENOME: 'CRISTINA',
    PARENTESCO: 'SOBRINHA'
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

let MOCK_RESIDENTE_FAMILIAR_FAMILIAR_CODIGO

//FINALIZANDO MOCKS