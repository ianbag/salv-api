const { ConvenioModel } = require('./../models')

class Convenio {

    get(req, res) {
        ConvenioModel.findAll({ raw: true })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        ConvenioModel.findByPk(req.params.id)
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        ConvenioModel.create(req.body)
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    update(req, res) {
        ConvenioModel.update(req.body, {
            where: {
                CODIGO: req.params.id
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ConvenioModel.destroy({
            where: {
                CODIGO: req.params.id
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }
}

module.exports = new Convenio()