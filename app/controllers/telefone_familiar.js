/**
 * author: hppod
 * create: 21/02/2019 14h25
 * file: controllers/telefone_familiar.js
 */

const { TelefoneFamiliarModel } = require('./../models')

class TelefoneFamiliar {

    getById(req, res) {
        TelefoneFamiliarModel.findByPk(req.params.id)
            .then(telefoneFamiliar => res.json(telefoneFamiliar))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefoneFamiliarModel.create(req.body)
            .then(telefoneFamiliar => res.json(telefoneFamiliar))
            .catch(error => res.json(error))
    }

    update(req, res) {

    }

    delete(req, res) {

    }
}

module.exports = new TelefoneFamiliar()