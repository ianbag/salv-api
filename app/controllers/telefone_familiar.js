/**
 * author: hppod
 * create: 21/02/2019 14h25
 * file: controllers/telefone_familiar.js
 */

const { TelefoneFamiliarModel, TelefoneModel, FamiliarModel } = require('./../models')

TelefoneFamiliarModel.belongsTo(TelefoneModel, { as: 'TELEFONE', foreignKey: 'TELEFONE_CODIGO' })
TelefoneFamiliarModel.belongsTo(FamiliarModel, { as: 'FAMILIAR', foreignKey: 'FAMILIAR_CODIGO' })

class TelefoneFamiliar {

    getById(req, res) {
        TelefoneFamiliarModel.findAll({
            include: [
                { model: TelefoneModel, as: 'TELEFONE' }
            ],
            where: { FAMILIAR_CODIGO: req.params.id }
        })
            .then(telefoneFamiliar => res.json(telefoneFamiliar))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefoneFamiliarModel.create(req.body)
            .then(telefoneFamiliar => res.json(telefoneFamiliar))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        TelefoneFamiliarModel.destroy({
            where: {
                TELEFONE_CODIGO: req.params.idTelefone,
                FAMILIAR_CODIGO: req.params.idFamiliar
            }
        })
            .then(telefoneFamiliar => res.json(telefoneFamiliar))
            .catch(error => res.json(error))
    }
}

module.exports = new TelefoneFamiliar()