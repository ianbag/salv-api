/**
 * author: NathanBarsoti8
*/

const express = require('express')
const route = express.Router()

const UsuarioController = require('./../controllers/usuario')


route.get('/usuario/:email', UsuarioController.getByMail)
route.post('/usuario', UsuarioController.create)
route.put('/usuario/:email', UsuarioController.update)
route.delete('/usuario/:email', UsuarioController.delete)

module.exports = route