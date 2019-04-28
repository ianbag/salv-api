/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:29:34
 * @modify date 2019-03-08 19:01:47
 * @desc Pessoa Controller
 */

const { PessoaModel } = require('./../models')
const sequelize = require('./../../database/sequelize_remote')

const OP = sequelize.Op

class Pessoa {
    get(req, res) {
        PessoaModel.findAll({
            raw: true,
            where: { STATUS: 1 }
        })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    getById(req, res) {
        PessoaModel.findOne({
            where: { 
                CODIGO: req.params.id,
                STATUS: 1
            } 
        })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    create(req, res) {
        PessoaModel.create(req.body)
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    update(req, res) {
        PessoaModel.update(req.body, {
            where: {
                CODIGO: req.params.id,
                STATUS: 1
            }
        })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        PessoaModel.update({ STATUS: 0 }, {
            where: {
                CODIGO: req.params.id,
                STATUS: 1
            }
        })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    uniqueCPF(req, res){
        PessoaModel.findOne({
            raw: true,
            where: { 
                STATUS: 1,
                CPF: req.body.CPF,
                CODIGO: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(pessoa => {
                if(pessoa)
                    res.json({value: 0, message: 'CPF não é único!'})
                    
                else
                    res.json({value: 1, message: 'CPF é único!'})
            })
            .catch(error => res.json(error))
    }

    uniqueRG(req, res){
        PessoaModel.findOne({
            raw: true,
            where: { 
                STATUS: 1,
                RG: req.body.RG,
                CODIGO: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(pessoa => {
                if(pessoa)
                    res.json({value: 0, message: 'RG não é único!'})
                    
                else
                    res.json({value: 1, message: 'RG é único!'})
            })
            .catch(error => res.json(error))
    }
}

module.exports = new Pessoa()