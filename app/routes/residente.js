/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:27:27
 * @modify date 2019-02-17 19:54:12
 * @desc Residente Route
 */

const express = require('express')
const route = express.Router()

const ResidenteController = require('./../controllers/residente')

route.get('/residente', ResidenteController.get)
route.get('/residente-inativos', ResidenteController.getInativos)
route.get('/residente/:id', ResidenteController.getById)
route.get('/residenteNome', ResidenteController.getName)
route.post('/residente', ResidenteController.create)
route.put('/residente/:id', ResidenteController.update)
route.delete('/residente/:id', ResidenteController.delete)

route.get('/aniversariante', ResidenteController.aniversariante)

module.exports = route