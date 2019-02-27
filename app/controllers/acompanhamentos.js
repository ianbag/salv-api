const { AcompanhamentosModel } = require('./../models')


class Acompanhamento {

    getAll (req, res) {
        AcompanhamentosModel.findAll({ raw: true })
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    getById (req, res) {
        AcompanhamentosModel.findById(req.params.id)
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    create (req, res) {
        AcompanhamentosModel.create(req.body)
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }
    
    update (req, res) {
        AcompanhamentosModel.update (req.body, {
            where: {
                CODIGO: req.params.id
            }
        })
        .then(acompanhamento => res.json(acompanhamento))
        .catch(error => res.json(error))
        
    }
        delete (req, res) {
            AcompanhamentosModel.destroy({
                where: {
                    CODIGO: req.params.id
                }
            })
                .then(acompanhamento => res.json(acompanhamento))
                .catch(error => res.json(error))
        }
    }

module.exports = new Acompanhamento()

