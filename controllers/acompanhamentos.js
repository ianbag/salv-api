const { AcompanhamentosModel } = require('./../models/acompanhamentos')
const { AcompanhamentosFuncionarioModel } = require('./../models/acompanhamento_funcionarios')
const { AcompanhamentosResidenteModel } = require('./../models/acompanhamento_residente')

class Acompanhamento {

    getAll (req, res) {
        AcompanhamentosModel.findAll({ raw: true })
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    getById (req, res) {
        AcompanhamentosModel.findById(req.params.id)
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    create (req, res) {
        AcompanhamentosModel.create(req.body, (error, acompanhamento) => {
            if (error)
                res.send(error)
            else
                res.json({message: 'Acompanhamento adicionado', data: acompanhamento})
        })
    }
    
    update (req, res) {
        AcompanhamentosModel.update({_id: req.params.id}, {$set: req.body}, (error, acompanhamento) => {
            if(error)
                res.send(error)
            else 
                res.json({message: 'Acompanhamento atualizado', data: acompanhamento})
        })
      }
        
        
        delete (req, res) {
            AcompanhamentosModel.del(req.params.id, (error, acompanhamento) => {
                if(error)
                    res.send(error)
                else
                    res.json({message: 'Acompanhamento deletado', data: acompanhamento})
            })
        }
    }




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

module.exports = new Acompanhamento()
module.exports = new  AcompanhamentoFuncionario()
module.exports = new  AcompanhamentoResidente()