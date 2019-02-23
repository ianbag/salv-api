/**
 * author: hppod
 * create: 22/02/2019 22h51
 * file: controllers/endereco_familiar.js
 */

const { EnderecoFamiliarModel } = require('./../models')

class EnderecoFamiliar {

    getById(req, res) {
        EnderecoFamiliarModel.findByPk(req.params.id)
            .then(enderecoFamiliar => res.json(enderecoFamiliar))
            .catch(error => res.json(error))
    }

    create(req, res) {
        EnderecoFamiliarModel.create(req.body)
            .then(enderecoFamiliar => res.json(enderecoFamiliar))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        EnderecoFamiliarModel.destroy({
            where: {
                FAMILIAR_CODIGO: req.params.id
            }
        })
            .then(enderecoFamiliar => res.json(enderecoFamiliar))
            .catch(error => res.json(error))
    }
}

module.exports = new EnderecoFamiliar()