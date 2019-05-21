/**
 * author: NathanBarsoti
 */

const { TelefoneParentescoModel, TelefoneModel, ResidenteConvenioModel } = require('./../models')

TelefoneParentescoModel.belongsTo(TelefoneModel, { as: 'TELEFONE', foreignKey: 'TELEFONE_CODIGO' })
TelefoneParentescoModel.belongsTo(ResidenteConvenioModel, { as: 'RESIDENTE_CONVENIO', foreignKey: 'NUMERO_CONVENIO' })

class TelefoneParentesco {

    getById(req, res) {
        TelefoneParentescoModel.findAll({
            include: [
                { model: TelefoneModel, as: 'TELEFONE' }
            ],
            where: { NUMERO_CONVENIO: req.params.id }
        })
            .then(telefoneParentesco => res.json(telefoneParentesco))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefoneParentescoModel.create(req.body)
            .then(telefoneParentesco => res.json(telefoneParentesco))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        TelefoneParentescoModel.destroy({
            where: {
                TELEFONE_CODIGO: req.params.idTelefone,
                NUMERO_CONVENIO: req.params.id
            }
        })
            .then(telefoneParentesco => res.json(telefoneParentesco))
            .catch(error => res.json(error))
    }
}

module.exports = new TelefoneParentesco()