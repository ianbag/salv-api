const { AcompanhamentoFuncionarioModel, AcompanhamentosModel, FuncionarioModel } = require('./../models/')

AcompanhamentoFuncionarioModel.belongsTo(AcompanhamentosModel, {as: 'ACOMPANHAMENTO', foreignKey: 'ACOMPANHAMENTO_CODIGO'})
AcompanhamentoFuncionarioModel.belongsTo(FuncionarioModel, {as: 'FUNCIONARIO', foreignKey: 'FUNCIONARIO_CODIGO'})

class AcompanhamentoFuncionario{

    getById (req, res) {
        AcompanhamentoFuncionarioModel.findById(req.params.id, {
            include: [
                {model: AcompanhamentosModel, as: 'ACOMPANHAMENTO'},
                {model: FuncionarioModel, as: 'FUNCIONARIO'}
            ]
        })
            .then(acompanhamento_funcionario => res.json(acompanhamento_funcionario))
            .catch(error => res.json(error))
    }

    create(req, res) {
        AcompanhamentoFuncionarioModel.create(req.body)
            .then(acompanhamento_funcionario => res.json(acompanhamento_funcionario))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        AcompanhamentoFuncionarioModel.destroy({ where: { FUNCIONARIO_CODIGO: req.params.id } })
            .then(acompanhamento_funcionario => res.json(acompanhamento_funcionario))
            .catch(error => res.json(error))
    }
    
    
}
module.exports = new  AcompanhamentoFuncionario()