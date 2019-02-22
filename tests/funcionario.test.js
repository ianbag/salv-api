/**
 * author: NathanBarsoti8
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { FuncionarioModel } = require('./../app/models')

const MOCK_FUNCIONARIO_DEFAULT = {
    NOME: 'Ronan',
    SOBRENOME: 'Perotti',
    RG: '963147852',
    CPF: '35714896205',
    SEXO: 'm',
    ESTADO_CIVIL: 'c',
    DATA_NASCIMENTO: '1990-11-30',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 's',
    CARGO: 'Fisioterapeuta',
    DATA_ADMISSAO: '2010-01-29',
    DATA_DEMISSAO: '2015-12-20'
}

const MOCK_FUNCIONARIO_CADASTRAR = {
    NOME: 'Joana',
    SOBRENOME: 'Portora',
    RG: '163985231',
    CPF: '30497096268',
    SEXO: 'f',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1996-12-20',
    RELIGIAO: 'eps',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 'n',
    CARGO: 'Terapeuta ocupacional',
    DATA_ADMISSAO: '2016-03-14'
}

const MOCK_FUNCIONARIO_ERROR = {
    NOME: 'João',
    SOBRENOME: 'Merchan',
    RG: '745896321',
    CPF: '45712036890',
    SEXO: 'm',
    ESTADO_CIVIL: 's',
    DATA_NASCIMENTO: '1993-02-18',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 's',
    DATA_ADMISSAO: '2016-07-08'
}

const MOCK_FUNCIONARIO_ATUALIZAR = {
    NOME: 'Paula',
    SOBRENOME: 'Brosvky',
    RG: '678412506',
    CPF: '86123749518',
    SEXO: 'f',
    ESTADO_CIVIL: 'c',
    DATA_NASCIMENTO: '1993-07-15',
    RELIGIAO: 'cat',
    ESCOLARIDADE: 'sc',
    FILHOS_MENOR_14: 's',
    CARGO: 'Dentista',
    DATA_ADMISSAO: '2017-06-30'
}

let MOCK_FUNCIONARIO_CODIGO

//Início dos tests

