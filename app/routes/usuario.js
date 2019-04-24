/**
 * author: NathanBarsoti8
*/

const express = require('express')
const route = express.Router()

const UsuarioController = require('./../controllers/usuario')

route.get('/usuario/:id', UsuarioController.getById)
route.post('/usuario', UsuarioController.create)
route.put('/usuario/:id', UsuarioController.update)
route.delete('/usuario', UsuarioController.delete)

route.post('/usuario/email', UsuarioController.uniqueEmail)
route.post('/usuario/login', UsuarioController.uniqueLogin)
route.post('/usuario/senha', UsuarioController.uniqueSenha)

module.exports = route