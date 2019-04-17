const sequelize = require('./../../database/sequelize_remote')

const { ResidenteConvenioModel, ResidenteModel, ConvenioModel } = require('../models')

ResidenteConvenioModel.belongsTo(ResidenteModel, { as: 'RESIDENTE', foreignKey: 'RESIDENTE_CODIGO' })
ResidenteConvenioModel.belongsTo(ConvenioModel, { as: 'CONVENIO', foreignKey: 'CONVENIO_CODIGO' })

class ResidenteConvenio {

    getById(req, res) {
        sequelize.query(`SELECT
                            C.NOME_CONVENIO, C.TIPO_CONVENIO,
                            E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA,
                            T.DDD, T.NUMERO TELEFONE,
                            RC.NUMERO_CONVENIO, RC.TITULAR_CONVENIO, RC.PARENTESCO_TITULAR
                        FROM 
                            RESIDENTE_CONVENIO RC
                            INNER JOIN CONVENIO C
                            ON C.CODIGO = RC.CONVENIO_CODIGO
                            LEFT JOIN ENDERECO_CONVENIO EC
                            ON EC.CONVENIO_CODIGO = RC.CONVENIO_CODIGO
                            LEFT JOIN ENDERECO E
                            ON E.CODIGO = EC.ENDERECO_CODIGO
                            LEFT JOIN TELEFONE_CONVENIO TC
                            ON TC.CONVENIO_CODIGO = RC.CONVENIO_CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TC.TELEFONE_CODIGO
                            WHERE RESIDENTE_CODIGO = :RESIDENTE_CODIGO AND
                            RC.STATUS = 1`,
            { replacements: { RESIDENTE_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    getOneById(req, res) {
        sequelize.query(`SELECT
                            C.NOME_CONVENIO, C.TIPO_CONVENIO,
                            E.ENDERECO, E.NUMERO, E.BAIRRO, E.COMPLEMENTO, E.CIDADE, E.ESTADO, E.CEP, E.REFERENCIA,
                            T.DDD, T.NUMERO TELEFONE,
                            RC.NUMERO_CONVENIO, RC.TITULAR_CONVENIO, RC.PARENTESCO_TITULAR
                        FROM 
                            RESIDENTE_CONVENIO RC
                            INNER JOIN CONVENIO C
                            ON C.CODIGO = RC.CONVENIO_CODIGO
                            LEFT JOIN ENDERECO_CONVENIO EC
                            ON EC.CONVENIO_CODIGO = RC.CONVENIO_CODIGO
                            LEFT JOIN ENDERECO E
                            ON E.CODIGO = EC.ENDERECO_CODIGO
                            LEFT JOIN TELEFONE_CONVENIO TC
                            ON TC.CONVENIO_CODIGO = RC.CONVENIO_CODIGO
                            LEFT JOIN TELEFONE T
                            ON T.CODIGO = TC.TELEFONE_CODIGO
                            WHERE RC.NUMERO_CONVENIO = :NUMERO_CONVENIO AND
                            RC.STATUS = 1`,
            { replacements: { NUMERO_CONVENIO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    create(req, res) {
        ResidenteConvenioModel.create(req.body)
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }

    update(req, res) {
        ResidenteConvenioModel.update(req.body, {
            where: {
                NUMERO_CONVENIO: req.params.id
            }
        })
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        ResidenteConvenioModel.update({ STATUS: 0 }, {
            where: {
                NUMERO_CONVENIO: req.params.id,
                STATUS: 1
            }
        })
            .then(residenteConvenio => res.json(residenteConvenio))
            .catch(error => res.json(error))
    }
}

module.exports = new ResidenteConvenio()