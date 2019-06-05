/**
 * author: NathanBarsoti
*/

const express = require('express')
const route = express.Router()

const TelefoneParentescoController = require('./../controllers/telefone_parentesco')

route.get('/telefone_parentesco/:id', TelefoneParentescoController.getAll)
route.post('/telefone_parentesco', TelefoneParentescoController.create)
route.delete('/telefone_parentesco/:idTelefone/:idNumero', TelefoneParentescoController.delete)

module.exports = route