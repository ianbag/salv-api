/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:46:19
 * @modify date 2019-02-20 11:31:36
 * @desc Arquivo de Rotas da API Beneficio
 */

 
const express = require('express')
const route = express.Router()

const BeneficioController = require('./../controllers/beneficio')

route.get('/beneficio/:id', BeneficioController.get)
route.get('/beneficio/:id/:name', BeneficioController.getByName)
route.post('/beneficio', BeneficioController.create)
route.put('/beneficio/:id/:name', BeneficioController.update)
route.delete('/beneficio/:id/:name', BeneficioController.delete)

route.get('/prova-de-vida', BeneficioController.provaDeVida)

module.exports = route