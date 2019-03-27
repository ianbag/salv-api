/**
 * author: hppod
 * create: 23/02/2019 00h46
 * file: controllers/residente_familiar.js
 */

const sequelize = require('../../database/sequelize_local')

const { ResidenteFamiliarModel, ResidenteModel } = require('./../models')


ResidenteFamiliarModel.belongsTo(ResidenteModel, { as: 'RESIDENTE', foreignKey: 'RESIDENTE_CODIGO' })

class ResidenteFamiliar {
    getById(req, res) {
        sequelize.query(`SELECT 
                            F.CODIGO, F.NOME, F.SOBRENOME, F.PARENTESCO,
                            E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA,
                            T.DDD, T.NUMERO TELEFONE
                        FROM 
                            RESIDENTE_FAMILIAR R
                            INNER JOIN FAMILIAR F 
                            ON R.FAMILIAR_CODIGO = F.CODIGO
                            LEFT JOIN ENDERECO_FAMILIAR EF
                            ON EF.FAMILIAR_CODIGO = F.CODIGO
                            LEFT JOIN ENDERECO E
                            ON E.CODIGO = EF.ENDERECO_CODIGO
                            LEFT JOIN TELEFONE_FAMILIAR TF
                            ON TF.FAMILIAR_CODIGO = F.CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TF.TELEFONE_CODIGO
                            WHERE RESIDENTE_CODIGO = :RESIDENTE_CODIGO`,
            { replacements: { RESIDENTE_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    create(req, res) {
        ResidenteFamiliarModel.create(req.body)
            .then(residenteFamiliar => res.json(residenteFamiliar))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ResidenteFamiliarModel.destroy({
            where: {
                RESIDENTE_CODIGO: req.params.id
            }
        })
            .then(residenteFamiliar => res.json(residenteFamiliar))
            .catch(error => res.json(error))
    }
}

module.exports = new ResidenteFamiliar()