const { TelefoneConvenioModel } = require('../models')

class TelefoneConvenio {

    getById(req, res) {
        TelefoneConvenioModel.findByPk(req.params.id)
            .then(telefoneConvenio => res.json(telefoneConvenio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefoneConvenioModel.create(req.body)
            .then(telefoneConvenio => res.json(telefoneConvenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        TelefoneConvenioModel.destroy({
            where: {
                CONVENIO_CODIGO: req.params.id
            }
        })
            .then(telefoneConvenio => res.json(telefoneConvenio))
            .catch(error => res.json(error))
    }
}

module.exports = new TelefoneConvenio()