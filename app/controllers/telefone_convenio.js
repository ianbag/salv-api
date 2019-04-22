const { TelefoneConvenioModel, TelefoneModel, ConvenioModel } = require('../models')


TelefoneConvenioModel.belongsTo(TelefoneModel, {as: 'TELEFONE', foreignKey: 'TELEFONE_CODIGO'})
TelefoneConvenioModel.belongsTo(ConvenioModel, {as: 'CONVENIO', foreignKey: 'CONVENIO_CODIGO'})

class TelefoneConvenio {

    getById(req, res) {
        TelefoneConvenioModel.findAll({
            where: {
                CONVENIO_CODIGO: req.params.id
            },
            include: [
                { model: TelefoneModel, as: 'TELEFONE' },
                { model: ConvenioModel, as: 'CONVENIO' }
            ]
        })

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