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
route.get('/residente/:id', ResidenteController.getById)
route.get('/residenteNome', ResidenteController.getName)
route.post('/residente', ResidenteController.create)
route.put('/residente/:id', ResidenteController.update)
route.delete('/residente/:id', ResidenteController.delete)
route.get('/aniversariante', ResidenteController.aniversariante)

route.post('/residente/cartao_sams', ResidenteController.uniqueCartaoSAMS)
route.post('/residente/cartao_sus', ResidenteController.uniqueCartaoSUS)
route.post('/residente/conta_inss', ResidenteController.uniqueContaINSS)
route.post('/residente/numero_certidao_nascimento', ResidenteController.uniqueNumeroCertidaoNascimento)
route.post('/residente/numero_inss', ResidenteController.uniqueNumeroINSS)
route.post('/residente/titulo_eleitor', ResidenteController.uniqueTituloEleitor)


module.exports = route