/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-24 14:02:41
 * @modify date 2019-02-24 14:04:34
 * @desc Arquivo de rotas da API Endereco Pessoa
 */

const express = require('express')
const route = express.Router()

const EnderecoPessoaController = require('./../controllers/endereco_pessoa')

route.get('/endereco_pessoa/:id', EnderecoPessoaController.getByID)
route.post('/endereco_pessoa', EnderecoPessoaController.create)
route.delete('/endereco_pessoa/:id', EnderecoPessoaController.delete)

module.exports = route