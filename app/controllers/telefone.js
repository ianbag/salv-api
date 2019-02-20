/**
 * author: hppod
 * create: 20/02/2019 01h07
 * file: controllers/telefone.js
 */

const { TelefoneModel } = require('./../models')

class Telefone {

    get(req, res) {
        TelefoneModel.findAll({ raw: true })
            .then(telefone => res.json(telefone))
            .catch(error => res.json(error))
    }

    getById(req, res) {

    }

    create(req, res) {

    }

    update(req, res) {

    }

    delete(req, res) {

    }
}

module.exports = new Telefone()