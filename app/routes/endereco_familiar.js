/**
 * author: hppod
 * create: 22/02/2019 22h53
 * file: routes/endereco_familiar.js
 */

const express = require('express')
const route = express.Router()

const EnderecoFamiliarController = require('./../controllers/endereco_familiar')

route.get('/endereco_familiar/:id', EnderecoFamiliarController.getById)
route.post('/endereco_familiar', EnderecoFamiliarController.create)
route.delete('/endereco_familiar/:id', EnderecoFamiliarController.delete)

module.exports = route