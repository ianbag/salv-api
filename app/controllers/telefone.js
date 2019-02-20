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
        TelefoneModel.findByPk(req.params.id)
            .then(telefone => res.json(telefone))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefoneModel.create(req.body)
            .then(telefone => res.json(telefone))
            .catch(error => res.json(error))
    }

    update(req, res) {
        TelefoneModel.update(req.body, {
            where: {
                CODIGO: req.params.id
            }
        })
            .then(telefone => res.json(telefone))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        TelefoneModel.destroy({
            where: {
                CODIGO: req.params.id
            }
        })
            .then(telefone => res.json(telefone))
            .catch(error => res.json(error))
    }
}

module.exports = new Telefone()