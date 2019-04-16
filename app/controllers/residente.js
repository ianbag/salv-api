/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:27:38
 * @modify date 2019-03-10 19:31:02
 * @desc Residente Controller
 */

const sequelize = require('./../../database/sequelize_remote')

const { ResidenteModel, PessoaModel } = require('./../models')

ResidenteModel.belongsTo(PessoaModel, { as: 'PESSOA', foreignKey: 'PESSOA_CODIGO' })

class Residente {
    get(req, res) {
        ResidenteModel.findAll({
            where: { STATUS: 1 },
            include: [{ model: PessoaModel, as: 'PESSOA' }],

        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    getById(req, res) {
        ResidenteModel.findOne({
            where: {
                CODIGO_RESIDENTE: req.params.id,
                STATUS: 1,
            },
            include: [{ model: PessoaModel, as: 'PESSOA' }],
        })
            .then(residente => res.json(residente))
            .catch(error => res.json(erro))
    }
    create(req, res) {
        ResidenteModel.create(req.body)
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    update(req, res) {
        ResidenteModel.update(req.body, {
            where: {
                CODIGO_RESIDENTE: req.params.id,
                STATUS: 1
            }
        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        ResidenteModel.update({ STATUS: 0 }, {
            where: {
                CODIGO_RESIDENTE: req.params.id,
                STATUS: 1
            }
        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }

    aniversariante(req, res) {
        sequelize.query(`SELECT
                            P.NOME, P.SOBRENOME, P.DATA_NASCIMENTO
                        FROM
                            RESIDENTE R
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = R.PESSOA_CODIGO
                            WHERE MONTH(P.DATA_NASCIMENTO) = :mes`,
            { replacements: { mes: (new Date().getMonth() + 1) } })
            .then(result => {
                res.json(result[0])
            })
    }

    getName(req, res){

        sequelize.query(`SELECT P.NOME, R.CODIGO_RESIDENTE
                FROM
                PESSOA AS P
                INNER JOIN RESIDENTE AS R
                ON P.CODIGO=R.PESSOA_CODIGO`

        )
            .then(result => {
                res.json(result[0])
            })
    }

   



}

module.exports = new Residente()