/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:31:32
 * @modify date 2019-02-17 11:31:50
 * @desc Route Pessoa
 */

const express = require('express')
const route = express.Router()

const PessoaController = require('./../controllers/pessoa')

route.get('/pessoa', PessoaController.get)
route.get('/pessoa/:id', PessoaController.getById)
route.post('/pessoa', PessoaController.create)
route.put('/pessoa/:id', PessoaController.update)
route.delete('/pessoa/:id', PessoaController.delete)

module.exports = route