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
//MODEL FAMILIAR (ADICIONAR AO SER FEITO)

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

