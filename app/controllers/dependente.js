/**
 * author: NathanBarsoti8
 */

 const { DependenteModel } = require('./../models')

 class Dependente {
     
    getById(req, res){
        DependenteModel.findByPk(req.params.id)
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error4))
    }

    create(req, res){
        DependenteModel.create(req.body)
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    update(req, res){
        DependenteModel.destroy({
            where: {
                DEPENDENTE: req.params.id
            }
        })
            .then(dependente => res.json(dependente))
            .catch(dependente => res.json(error))
    }

    delete(req, res){
        DependenteModel.destroy({
            where: {
                DEPENDENTE: req.params.id
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

 }

 module.exports = new Dependente()