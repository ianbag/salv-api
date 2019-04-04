const sequelize = require('./../../database/sequelize_remote')

/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:52:42
 * @modify date 2019-02-19 11:54:51
 * @desc Controller da API de Beneficio
 */

const { BeneficioModel } = require('./../models')

class Beneficio {
    get(req, res) {
        BeneficioModel.findAll({
            raw: true,
            where: { STATUS: 0 }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    getByName(req, res) {
        BeneficioModel.findOne({
            where: {
                NOME_BENEFICIO: req.params.name,
                STATUS: 0
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
                NOME_BENEFICIO: req.params.name,
                STATUS: 0
            }
        })
            .then(beneficio => res.json(beneficio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        BeneficioModel.update({ STATUS: 1 }, {
            where: {
                NOME_BENEFICIO: req.params.name,
                STATUS: 0
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
                            AND YEAR(B.PROVA_VIDA_BENEFICIO) = :ano`,
            { replacements: { mes: (data.getMonth() + 1), ano: data.getFullYear() } })
            .then(result => {
                res.json(result[0])
            })
    }
}

module.exports = new Beneficio()