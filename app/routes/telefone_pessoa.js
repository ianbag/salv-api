/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:48:10
 * @modify date 2019-02-20 19:48:10
 * @desc Arquivo de rotas da API de Telefone Pessoa
 */

const express = require('express')
const route = express.Router()

const TelefonePessoaController = require('./../controllers/telefone_pessoa')

route.get('/telefone_pessoa/:id', TelefonePessoaController.getById)
route.post('/telefone_pessoa', TelefonePessoaController.create)
route.delete('/telefone_pessoa/:pessoaId/:telefoneId', TelefonePessoaController.delete)

module.exports = route