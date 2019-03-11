const { ResidenteConvenioModel } = require('../models')

class ResidenteConvenio {

    getById(req, res) {
        ResidenteConvenioModel.findOne({
            where: {
                CONVENIO_CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        ResidenteConvenioModel.create(req.body)
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ResidenteConvenioModel.update({STATUS: 1}, {
            where: {
                CONVENIO_CODIGO: req.params.id,
                STATUS: 0
            }
        })
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }
}

module.exports = new ResidenteConvenio()