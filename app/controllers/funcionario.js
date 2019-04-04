/*
 * @Author: Ian Rotondo Bagliotti 
 * @Date: 2019-03-08 19:21:11 
 * @Last Modified by: Ian Rotondo Bagliotti
 * @Last Modified time: 2019-03-16 20:55:04
 */
/**
 * author: NathanBarsoti8
 */
const sequelize = require('./../../database/sequelize_remote')

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

    getFuncionarioFull(req, res) {
        sequelize.query(`SELECT P.CODIGO AS COD_PES, P.NOME, P.SOBRENOME, P.RG, P.CPF, P.SEXO, P.ESTADO_CIVIL, P.DATA_NASCIMENTO, P.RELIGIAO, P.ESCOLARIDADE, F.CODIGO_FUNCIONARIO AS COD_FUN, F.CARGO, F.DATA_ADMISSAO, T.CODIGO AS COD_TEL, T.DDD, T.NUMERO AS NUM_TEL, E.CODIGO AS COD_END, E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA FROM PESSOA AS P INNER JOIN FUNCIONARIO AS F ON P.CODIGO = F.PESSOA_CODIGO INNER JOIN TELEFONE_PESSOA AS TP ON P.CODIGO = TP.PESSOA_CODIGO INNER JOIN TELEFONE AS T ON T.CODIGO = TP.TELEFONE_CODIGO INNER JOIN ENDERECO_PESSOA AS EP ON P.CODIGO = EP.PESSOA_CODIGO INNER JOIN ENDERECO AS E ON E.CODIGO = EP.ENDERECO_CODIGO WHERE F.CODIGO_FUNCIONARIO = ${req.params.id} `).then(result => res.json(result[0]))
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