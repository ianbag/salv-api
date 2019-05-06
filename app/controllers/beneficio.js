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
                            CONCAT(P.NOME, ' ', P.SOBRENOME) AS NOME,
                            'INSS' AS NOME_BENEFICIO,
                            DATE_FORMAT(R.PROVA_VIDA_INSS, '%d/%m') AS PROVAS_VIDA
                        FROM
                            RESIDENTE AS R
                                INNER JOIN
                            PESSOA AS P ON R.PESSOA_CODIGO = P.CODIGO
                        WHERE
                            R.PROVA_VIDA_INSS IS NOT NULL
                                AND R.STATUS = 1
                                AND MONTH(R.PROVA_VIDA_INSS) = 5 
                        UNION ALL SELECT 
                            CONCAT(P.NOME, ' ', P.SOBRENOME),
                            B.NOME_BENEFICIO,
                            DATE_FORMAT(B.PROVA_VIDA_BENEFICIO, '%d/%m')
                        FROM
                            BENEFICIO AS B
                                INNER JOIN
                            RESIDENTE AS R ON R.CODIGO_RESIDENTE = B.CODIGO_RESIDENTE
                                INNER JOIN
                            PESSOA AS P ON R.PESSOA_CODIGO = P.CODIGO
                        WHERE
                            B.PROVA_VIDA_BENEFICIO IS NOT NULL
                                AND B.STATUS = 1
                                AND MONTH(B.PROVA_VIDA_BENEFICIO) = :mes
                        ORDER BY PROVAS_VIDA`,
            { replacements: { mes: (data.getMonth() + 1) } })
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
                NOME_BENEFICIO: req.body.NOME_BENEFICIO,
            }
        })
            .then(beneficio => {
                if (beneficio && req.body.NOME_BENEFICIO != req.body.NOME_BENEFICIO_EDITAR)
                    res.json({ beneficio, value: 0, message: 'Nome Benefício não é único!' })

                else
                    res.json({ value: 1, message: 'Nome Benefício é único!' })
            })
            .catch(error => res.json(error))
    }
}

module.exports = new Beneficio()