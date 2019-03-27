/*
 * @Author: Ian Rotondo Bagliotti 
 * @Date: 2019-03-08 19:21:11 
 * @Last Modified by: Ian Rotondo Bagliotti
 * @Last Modified time: 2019-03-16 20:55:04
 */
/**
 * author: NathanBarsoti8
 */

const Sequelize = require('sequelize')
let sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
    host: "mysql995.umbler.com",
    port: "41890",
    dialect: "mysql"
})

const { FuncionarioModel } = require('./../models')

class Funcionario {

    get(req, res) {
        sequelize.query(`SELECT
                            F.CODIGO_FUNCIONARIO CODIGO,
                            P.NOME FUNCIONARIO_NOME, P.SOBRENOME FUNCIONARIO_SOBRENOME, P.CPF, P.RG,
                            D.NOME DEPENDENTE_NOME, D.SOBRENOME DEPENDENTE_SOBRENOME
                        FROM
                            FUNCIONARIO F
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = F.PESSOA_CODIGO
                            LEFT JOIN DEPENDENTE D
                            ON D.CODIGO_FUNCIONARIO = F.CODIGO_FUNCIONARIO
                            WHERE F.STATUS = 0`,
        )
            .then(result => {
                res.json(result[0])
            })
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

    getName(req, res){

        sequelize.query(`SELECT NOME 
                FROM
                PESSOA AS P
                INNER JOIN FUNCIONARIO AS F
                ON P.CODIGO=F.CODIGO_FUNCIONARIO`
                
        )
    .then(result => {
    res.json(result[0])
        })
    }

}

module.exports = new Funcionario()