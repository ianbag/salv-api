/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:46:19
 * @modify date 2019-02-19 11:54:56
 * @desc Arquivo de testes da API de Beneficio
 */

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

const app = require('./../app')
const { BeneficioModel } = require('./../app/models')

describe('TDD API Beneficio: ', function () {
    this.beforeAll(async() => {

    })

    describe('/GET:', () => {

    })
})