const { AcompanhametosModel } = require('./../models')

class Acompanhamento {

    getAll(req, res) {
        AcompanhamentosModel.findAll({ raw: true })
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        AcompanhamentosModel.findById(req.params.id)
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    create(req, res) {
        AcompanhamentosModel.create(req.body, (error, acompanhamento) => {
            if (error)
                res.send(error)
            else
                res.json({message: 'Acompanhamento adicionado', data: acompanhamento})
        })
    }
    
    update(req, res) {
        AcompanhametosModel.update({_id: req.params.id}, {$set: req.body}, (error, acompanhamento) => {
            if(error)
                res.send(error)
            else 
                res.json({message: 'Acompanhamento atualizado', data: acompanhamento})
        })
      }
        
        
        delete(req, res) {
            AcompanhametosModel.del(req.params.id, (error, acompanhamento) => {
                if(error)
                    res.send(error)
                else
                    res.json({message: 'Acompanhamento deletado', data: acompanhamento})
            })
        }
    }


module.exports = new Acompanhamento()