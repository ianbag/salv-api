/**
 * author: hppod
 * create: 22/02/2019 22h51
 * file: controllers/endereco_familiar.js
 */

const { EnderecoFamiliarModel, EnderecoModel, FamiliarModel } = require('./../models')

EnderecoFamiliarModel.belongsTo(EnderecoModel, {as: 'ENDERECO', foreignKey: 'ENDERECO_CODIGO'})
EnderecoFamiliarModel.belongsTo(FamiliarModel, {as: 'FAMILIAR', foreignKey: 'FAMILIAR_CODIGO'})

class EnderecoFamiliar {

    getById(req, res) {
        EnderecoFamiliarModel.findByPk(req.params.id, {
            include: [
                {model: EnderecoModel, as: 'ENDERECO'},
                {model: FamiliarModel, as: 'FAMILIAR'}
            ]
        })
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