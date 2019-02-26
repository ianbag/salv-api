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