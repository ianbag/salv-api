/**
 * author: hppod
 * create: 23/02/2019 00h46
 * file: controllers/residente_familiar.js
 */

const { ResidenteFamiliarModel, ResidenteModel, FamiliarModel } = require('./../models')

ResidenteFamiliarModel.belongsTo(ResidenteModel, {as: 'RESIDENTE', foreignKey: 'RESIDENTE_CODIGO'})
ResidenteFamiliarModel.belongsTo(FamiliarModel, {as: 'FAMILIAR', foreignKey: 'FAMILIAR_CODIGO'})

class ResidenteFamiliar {

    getById(req, res) {
        ResidenteFamiliarModel.findByPk(req.params.id, {
            include: [
                {model: ResidenteModel, as: 'RESIDENTE'},
                {model: FamiliarModel, as: 'FAMILIAR'}
            ]
        })
            .then(residenteFamiliar => res.json(residenteFamiliar))
            .catch(error => res.json(error))
    }

    create(req, res) {
        ResidenteFamiliarModel.create(req.body)
            .then(residenteFamiliar => res.json(residenteFamiliar))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ResidenteFamiliarModel.destroy({
            where: {
                FAMILIAR_CODIGO: req.params.id
            }
        })
            .then(residenteFamiliar => res.json(residenteFamiliar))
            .catch(error => res.json(error))
    }
}

module.exports = new ResidenteFamiliar()