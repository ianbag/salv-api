/**
 * author: NathanBarsoti8
 */

 const { FuncionarioModel } = require('./../models')

 class Funcionario {
     
    get(req, res){
        FuncionarioModel.findAll({ raw: true })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    getById(req, res){
        FuncionarioModel.findByPk(req.params.id)
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    create(req, res){
        FuncionarioModel.create(req.body)
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    update(req, res){
        FuncionarioModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id
            }
        })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    delete(req, res){
        FuncionarioModel.destroy({
            where: {
                CODIGO_FUNCIONARIO: req.params.id
            }
        })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

 }

 module.exports = new Funcionario()