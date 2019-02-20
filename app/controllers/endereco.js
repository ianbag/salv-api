/**
 * author: hppod
 * create: 19/02/2019 23h35
 * file: controllers/endereco.js
 */

const { EnderecoModel } = require('./../models')

class Endereco {

    get(req, res) {
        EnderecoModel.findAll({ raw: true })
            .then(endereco => res.json(endereco))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        EnderecoModel.findByPk(req.params.id)
        .then(endereco => res.json(endereco))
        .catch(error => res.json(error))
    }

    create(req, res) {
        EnderecoModel.create(req.body)
        .then(endereco => res.json(endereco))
        .catch(error => res.json(error))
    }

    update(req, res) {

    }

    delete(req, res) {

    }
}

module.exports = new Endereco()