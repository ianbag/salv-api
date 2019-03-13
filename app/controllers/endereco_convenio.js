const { EnderecoConvenioModel, EnderecoModel, ConvenioModel } = require('../models')

EnderecoConvenioModel.belongsTo(EnderecoModel, {as: 'ENDERECO', foreignKey: 'ENDERECO_CODIGO'})
EnderecoConvenioModel.belongsTo(ConvenioModel, {as: 'CONVENIO', foreignKey: 'CONVENIO_CODIGO'})

class EnderecoConvenio {
    getById(req, res) {
        EnderecoConvenioModel.findByPk(req.params.id, {
            include: [
                {model: EnderecoModel, as: 'ENDERECO'},
                {model: ConvenioModel, as: 'CONVENIO'}
            ]
        })
            .then(enderecoConvenio => res.json(enderecoConvenio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        EnderecoConvenioModel.create(req.body)
            .then(enderecoConvenio => res.json(enderecoConvenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        EnderecoConvenioModel.destroy({
            where: {
                CONVENIO_CODIGO: req.params.id
            }
        })
            .then(enderecoConvenio => res.json(enderecoConvenio))
            .catch(error => res.json(error))
    }
}

module.exports = new EnderecoConvenio()