const { ResidenteConvenioModel } = require('./../models')

class ResidenteConvenio {

    getById(req, res) {
        ResidenteConvenioModel.findByPk(req.params.id)
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        ResidenteConvenioModel.create(req.body)
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ResidenteConvenioModel.destroy({
            where: {
                CONVENIO_CODIGO: req.params.id
            }
        })
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }
}

module.exports = new ResidenteConvenio()