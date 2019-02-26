/**
 * author: hppod
 * create: 18/02/2019 20h22
 * file: routes/familiar.js
 */

const express = require('express')
const route = express.Router()

const FamiliarController = require('./../controllers/familiar')

route.get('/familiar', FamiliarController.get)
route.get('/familiar/:id', FamiliarController.getById)
route.post('/familiar', FamiliarController.create)
route.put('/familiar/:id', FamiliarController.update)
route.delete('/familiar/:id', FamiliarController.delete)

module.exports = route
