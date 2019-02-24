/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:52:42
 * @modify date 2019-02-19 11:54:51
 * @desc Controller da API de Beneficio
 */

const { BeneficioModel } = require('./../models')

class Beneficio {
    get(req, res) {
        BeneficioModel.findAll({ raw: true })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    getByName(req, res) {
        BeneficioModel.findOne({ 
            where: {
             NOME_BENEFICIO: req.params.name 
            } 
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        BeneficioModel.create(req.body)
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    update(req, res) {
        BeneficioModel.update(req.body, { 
            where: {
                NOME_BENEFICIO: req.params.name
            }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        BeneficioModel.destroy({
            where: {
                NOME_BENEFICIO: req.params.name
            }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }
}

module.exports = new Beneficio()