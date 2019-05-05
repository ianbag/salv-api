/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:27:38
 * @modify date 2019-03-10 19:31:02
 * @desc Residente Controller
 */

const sequelize = require('./../../database/sequelize_remote')
const OP = sequelize.Op

const { ResidenteModel, PessoaModel, AcompanhamentoResidenteModel } = require('./../models')

ResidenteModel.belongsTo(PessoaModel, { as: 'PESSOA', foreignKey: 'PESSOA_CODIGO' })
ResidenteModel.belongsTo(AcompanhamentoResidenteModel, {as: 'ACOMPANHAMENTO_RESIDENTE', foreignKey: 'CODIGO_RESIDENTE'})

class Residente {
    //get(req, res) {
      //  ResidenteModel.findAll({
        //    where: { STATUS: 1 },
          //  include: [{ model: PessoaModel, as: 'PESSOA' }],

        //})
          //  .then(residente => res.json(residente))
            //.catch(error => res.json(error))
    //}

    get(req, res) {
        sequelize.query(`SELECT
                            R.CODIGO_RESIDENTE CODIGO,
                            P.NOME RESIDENTE_NOME,
                            P.SOBRENOME RESIDENTE_SOBRENOME,
                            R.APELIDO,
                            P.CPF RESIDENTE_CPF,
                            P.RG RESIDENTE_RG
                        FROM
                            RESIDENTE R
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = R.PESSOA_CODIGO
                            WHERE R.STATUS = 1`
                        )
                .then(result => {
                    res.json(result[0])
                })
    }

    getInativos(req, res) {
        ResidenteModel.findAll({
            where: { STATUS: 0 },
            include: [{ model: PessoaModel, as: 'PESSOA' }],

        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        ResidenteModel.findOne({
            where: {
                CODIGO_RESIDENTE: req.params.id
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

    ativar(req, res) {
        ResidenteModel.update({ STATUS: 1 }, {
            where: {
                CODIGO_RESIDENTE: req.params.id,
                STATUS: 0
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
                            WHERE MONTH(P.DATA_NASCIMENTO) = :mes AND
                            R.STATUS = 1
                            ORDER BY DAY(P.DATA_NASCIMENTO) ASC`,
            { replacements: { mes: (new Date().getMonth() + 1) } })
            .then(result => {
                res.json(result[0])
            })
    }

    getName(req, res) {

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


    uniqueTituloEleitor(req, res) {
        ResidenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                TITULO_ELEITOR: req.body.TITULO_ELEITOR,
                CODIGO_RESIDENTE: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(residente => {
                if (residente)
                    res.json({ value: 0, message: 'TItulo de Eleitor não é único!' })

                else
                    res.json({ value: 1, message: 'TItulo de Eleitor é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueNumeroCertidaoNascimento(req, res) {
        ResidenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                NUMERO_CERTIDAO_NASCIMENTO: req.body.NUMERO_CERTIDAO_NASCIMENTO,
                CODIGO_RESIDENTE: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(residente => {
                if (residente)
                    res.json({ value: 0, message: 'Número de Certidão de Nascimento não é único!' })

                else
                    res.json({ value: 1, message: 'Número de Certidão de Nascimento é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueCartaoSAMS(req, res) {
        ResidenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                CARTAO_SAMS: req.body.CARTAO_SAMS,
                CODIGO_RESIDENTE: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(residente => {
                if (residente)
                    res.json({ value: 0, message: 'Cartão SAMS não é único!' })

                else
                    res.json({ value: 1, message: 'Cartão SAMS é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueCartaoSUS(req, res) {
        ResidenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                CARTAO_SUS: req.body.CARTAO_SUS,
                CODIGO_RESIDENTE: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(residente => {
                if (residente)
                    res.json({ value: 0, message: 'Cartão SUS não é único!' })

                else
                    res.json({ value: 1, message: 'Cartão SUS é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueNumeroINSS(req, res) {
        ResidenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                NUMERO_INSS: req.body.NUMERO_INSS,
                CODIGO_RESIDENTE: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(residente => {
                if (residente)
                    res.json({ value: 0, message: 'Número INSS não é único!' })

                else
                    res.json({ value: 1, message: 'Número INSS é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueContaINSS(req, res) {
        ResidenteModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                CONTA_INSS: req.body.CONTA_INSS,
                CODIGO_RESIDENTE: {[OP.ne]: req.body.CODIGO}
            }
        })
            .then(residente => {
                if (residente)
                    res.json({ value: 0, message: 'Conta INSS não é único!' })

                else
                    res.json({ value: 1, message: 'Conta INSS é único!' })
            })
            .catch(error => res.json(error))
    }


}

module.exports = new Residente()