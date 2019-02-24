/**
 * author: NathanBarsoti8
*/

const express = require('express')
const route = express.Router()

const UsuarioController = require('./../controllers/usuario')

route.get('/usuario/:id', UsuarioController.getById)
route.get('/usuario', UsuarioController.create)
route.get('/usuario', UsuarioController.update)
route.get('/usuario', UsuarioController.delete)

module.exports = route