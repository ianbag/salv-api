

const { AcompanhamentosResidenteModel } = require('./../models/acompanhamento_residente')

class AcompanhamentoResidente{

    getAll (req, res) {
        AcompanhamentosResidenteModel.findAll({ raw: true })
            .then(acompanhamento_residente => res.json(acompanhamento_residente))
            .catch(error => res.json(error))
    }

    getById (req, res) {
        AcompanhamentosResidenteModel.findById(req.params.id)
            .then(acompanhamento_residente => res.json(acompanhamento_residente))
            .catch(error => res.json(error))
    }
    
    
}
module.exports = new  AcompanhamentoResidente()