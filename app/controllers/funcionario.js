/*
 * @Author: Ian Rotondo Bagliotti 
 * @Date: 2019-03-08 19:21:11 
 * @Last Modified by:   Ian Rotondo Bagliotti 
 * @Last Modified time: 2019-03-08 19:21:11 
 */
/**
 * author: NathanBarsoti8
 */

const { FuncionarioModel } = require('./../models')

class Funcionario {

    get(req, res) {
        FuncionarioModel.findAll({
            raw: true,
            where: { STATUS: 0 }
        })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        FuncionarioModel.findOne({
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    create(req, res) {
        FuncionarioModel.create(req.body)
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    update(req, res) {
        FuncionarioModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        FuncionarioModel.update({ STATUS: 1 }, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(funcionario => res.json(funcionario))
            .catch(error => res.json(error))
    }

}

module.exports = new Funcionario()