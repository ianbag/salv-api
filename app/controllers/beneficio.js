/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:52:42
 * @modify date 2019-02-19 11:54:51
 * @desc Controller da API de Beneficio
 */

const sequelize = require('./../../database/sequelize_remote')

const OP = sequelize.Op 

const { BeneficioModel } = require('./../models')

class Beneficio {
    get(req, res) {
        BeneficioModel.findAll({
            raw: true,
            where: {
                CODIGO_RESIDENTE: req.params.id,
                STATUS: 1 
                }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    getByName(req, res) {
        BeneficioModel.findOne({
            where: {
                CODIGO_RESIDENTE: req.params.id,
                NOME_BENEFICIO: req.params.name,
                STATUS: 1
            }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    create(req, res) {
        BeneficioModel.create(req.body)
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    update(req, res) {
        BeneficioModel.update(req.body, {
            where: {
                CODIGO_RESIDENTE: req.params.id,
                NOME_BENEFICIO: req.params.name,
                STATUS: 1
            }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        BeneficioModel.update({ STATUS: 0 }, {
            where: {
                CODIGO_RESIDENTE: req.params.id,
                NOME_BENEFICIO: req.params.name,
                STATUS: 1
            }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    provaDeVida(req, res) {
        let data = new Date()
        sequelize.query(`SELECT
                            B.NOME_BENEFICIO, B.PROVA_VIDA_BENEFICIO,
                            P.NOME, P.SOBRENOME
                        FROM 
                            BENEFICIO B
                            LEFT JOIN RESIDENTE R
                            ON R.CODIGO_RESIDENTE = B.CODIGO_RESIDENTE
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = R.PESSOA_CODIGO
                            WHERE MONTH(B.PROVA_VIDA_BENEFICIO) = :mes
                            AND YEAR(B.PROVA_VIDA_BENEFICIO) = :ano 
                            AND B.STATUS = 1
                            ORDER BY DAY(B.PROVA_VIDA_BENEFICIO) ASC`,
            { replacements: { mes: (data.getMonth() + 1), ano: data.getFullYear() } })
            .then(result => {
                res.json(result[0])
            })
    }

    uniqueNome(req, res) {
        BeneficioModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                CODIGO_RESIDENTE: req.body.CODIGO,
                NOME_BENEFICIO:  req.body.NOME_BENEFICIO ,
            }
        })
            .then(beneficio => {
                if (beneficio && req.body.NOME_BENEFICIO != req.body.NOME_BENEFICIO_EDITAR)
                    res.json({beneficio, value: 0, message: 'Nome Benefício não é único!' })

                else
                    res.json({ value: 1, message: 'Nome Benefício é único!' })
            })
            .catch(error => res.json(error))
    }
}

module.exports = new Beneficio()