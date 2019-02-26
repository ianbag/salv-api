/**
 * author: hppod
 * create: 23/02/2019 00h50
 * file: routes/residente_familiar.js
 */

const express = require('express')
const route = express.Router()

const ResidenteFamiliarController = require('./../controllers/residente_familiar')

route.get('/residente_familiar/:id', ResidenteFamiliarController.getById)
route.post('/residente_familiar', ResidenteFamiliarController.create)
route.delete('/residente_familiar/:id', ResidenteFamiliarController.delete)

module.exports = route