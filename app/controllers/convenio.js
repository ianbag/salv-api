const { ConvenioModel } = require('./../models')

class Convenio {

    get(req, res) {
        ConvenioModel.findAll({
            raw: true,
            where: {STATUS: 0}    
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        ConvenioModel.findOne({
            where: {
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
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
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ConvenioModel.update({STATUS: 1},{
            where: {
                CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(convenio => res.json(convenio))
            .catch(error => res.json(error))
    }
}

module.exports = new Convenio()