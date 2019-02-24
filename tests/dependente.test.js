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

 }

 const MOCK_DEPENDENTE_CADASTRAR = {

 }

 const MOCK_DEPENDENTE_ERROR = {

 }

 const MOCK_DEPENDENTE_ATUALIZAR = {

 }

 let MOCK_DEPENDENTE_CODIGO

 //Início dos tests