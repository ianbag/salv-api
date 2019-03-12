/**
 * author: NathanBarsoti8
*/

const express = require('express')
const route = express.Router()

const UsuarioController = require('./../controllers/usuario')

route.post('/usuario', UsuarioController.create)
route.put('/usuario', UsuarioController.update)
route.delete('/usuario', UsuarioController.delete)

module.exports = route