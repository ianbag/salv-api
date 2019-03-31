/*
 * @Author: Ian Rotondo Bagliotti 
 * @Date: 2019-03-08 19:21:11 
 * @Last Modified by: Ian Rotondo Bagliotti
 * @Last Modified time: 2019-03-16 20:55:04
 */
/**
 * author: NathanBarsoti8
 */

const sequelize = require('../../database/sequelize_remote')

const { FuncionarioModel, PessoaModel, UsuarioModel } = require('./../models')

FuncionarioModel.belongsTo(PessoaModel, { as: 'PESSOA', foreignKey: 'PESSOA_CODIGO' })
FuncionarioModel.belongsTo(UsuarioModel, { as: 'USUARIO', foreignKey: 'CODIGO_FUNCIONARIO' })

class Funcionario {

    get(req, res) {
        sequelize.query(`SELECT
                            F.CODIGO_FUNCIONARIO CODIGO,
                            P.NOME FUNCIONARIO_NOME, P.SOBRENOME FUNCIONARIO_SOBRENOME, P.CPF, P.RG
                        FROM
                            FUNCIONARIO F
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = F.PESSOA_CODIGO
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
            },
            include: [
                { model: PessoaModel, as: 'PESSOA' }, 
                { model: UsuarioModel, as: 'USUARIO' }
            ]
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

    getName(req, res) {

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