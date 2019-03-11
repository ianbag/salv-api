/**
 * author: hppod
 * create: 18/02/2019 20h24
 * file: controllers/familiar.js
 */

const { FamiliarModel } = require('./../models')

class Familiar {

    get(req, res) {
        FamiliarModel.findAll({ 
            raw: true,
            where: { STATUS: 0}
        })
            .then(familiar => res.json(familiar))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        FamiliarModel.findOne({
            where: {
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(familiar => res.json(familiar))
            .catch(error => res.json(error))
    }

    create(req, res) {
        FamiliarModel.create(req.body)
            .then(familiar => res.json(familiar))
            .catch(error => res.json(error))
    }

    update(req, res) {
        FamiliarModel.update(req.body, {
            where: {
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(familiar => res.json(familiar))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        FamiliarModel.update({STATUS: 1}, {
            where: {
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(familiar => res.json(familiar))
            .catch(error => res.json(error))
    }
}

module.exports = new Familiar()