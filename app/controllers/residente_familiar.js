/**
 * author: hppod
 * create: 23/02/2019 00h46
 * file: controllers/residente_familiar.js
 */
const sequelize = require('./../../database/sequelize_remote')

const { ResidenteFamiliarModel, ResidenteModel } = require('./../models')


ResidenteFamiliarModel.belongsTo(ResidenteModel, { as: 'RESIDENTE', foreignKey: 'RESIDENTE_CODIGO' })

class ResidenteFamiliar {
    getById(req, res) {
        let residenteFamiliarRes;
        let responseTotal = []
        sequelize.query(`SELECT 
                            F.CODIGO, F.NOME, F.SOBRENOME, F.PARENTESCO,
                            E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA
                        FROM 
                            RESIDENTE_FAMILIAR R
                            INNER JOIN FAMILIAR F 
                            ON R.FAMILIAR_CODIGO = F.CODIGO
                            LEFT JOIN ENDERECO_FAMILIAR EF
                            ON EF.FAMILIAR_CODIGO = F.CODIGO
                            LEFT JOIN ENDERECO E
                            ON E.CODIGO = EF.ENDERECO_CODIGO
                            WHERE RESIDENTE_CODIGO = :RESIDENTE_CODIGO`,
            { replacements: { RESIDENTE_CODIGO: req.params.id } })
            .then(result => {
               /* result[0].forEach(element => {
                    sequelize.query(`SELECT
                                        T.*
                                    FROM
                                        TELEFONE_FAMILIAR TF
                                        INNER JOIN TELEFONE T
                                        ON T.CODIGO = TF.TELEFONE_CODIGO
                                        WHERE FAMILIAR_CODIGO = :FAMILIAR_CODIGO`,
                        { replacements: { FAMILIAR_CODIGO: element.CODIGO } })
                        .then(resultTelefone => {
                            residenteFamiliarRes = {
                                ...result[0],
                                "TELEFONES": resultTelefone[0]
                            }
                            responseTotal.push(residenteFamiliarRes)
                            //console.log(residenteFamiliarRes)
                        })
                })
                console.log("REPSONSE TOTAL", responseTotal)
                //res.json(residenteFamiliarRes)
                */
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