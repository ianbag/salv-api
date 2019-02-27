const { AcompanhamentosFuncionarioModel } = require('./../models/acompanhamento_funcionario')

class AcompanhamentoFuncionario{

    getAll (req, res) {
        AcompanhamentosFuncionarioModel.findAll({ raw: true })
            .then(acompanhamento_funcionario => res.json(acompanhamento_funcionario))
            .catch(error => res.json(error))
    }

    getById (req, res) {
        AcompanhamentosFuncionarioModel.findById(req.params.id)
            .then(acompanhamento_funcionario => res.json(acompanhamento_funcionario))
            .catch(error => res.json(error))
    }
    
    
}
module.exports = new  AcompanhamentoFuncionario()