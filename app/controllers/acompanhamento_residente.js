const { AcompanhamentoResidenteModel, AcompanhamentosModel, ResidenteModel } = require('./../models')

AcompanhamentoResidenteModel.belongsTo(AcompanhamentosModel, {as: 'ACOMPANHAMENTO', foreignKey:'ACOMPANHAMENTO_CODIGO'})
AcompanhamentoResidenteModel.belongsTo(ResidenteModel, {as: 'RESIDENTE', foreignKey:'RESIDENTE_CODIGO'})

class AcompanhamentoResidente{

    getById (req, res) {
        AcompanhamentoResidenteModel.findById(req.params.id, {
            include: [
                {model: AcompanhamentosModel, as: 'ACOMPANHAMENTO'},
                {model: ResidenteModel, as: 'RESIDENTE'}
            ]
        })
            .then(acompanhamento_residente => res.json(acompanhamento_residente))
            .catch(error => res.json(error))
    }
    create(req, res) {
        AcompanhamentoResidenteModel.create(req.body)
            .then(acompanhamento_residente => res.json(acompanhamento_residente))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        AcompanhamentoResidenteModel.destroy({ where: { RESIDENTE_CODIGO: req.params.id } })
            .then(acompanhamento_residente => res.json(acompanhamento_residente))
            .catch(error => res.json(error))
    }
    
    
}
module.exports = new  AcompanhamentoResidente()