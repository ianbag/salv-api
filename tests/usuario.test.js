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

 }

 const MOCK_USUARIO_CADASTRAR = {

 }

 const MOCK_USUARIO_ERROR = {

 }

 const MOCK_USUARIO_ATUALIZAR = {

 }

 let MOCK_USUARIO_CODIGO

 //Início dos tests