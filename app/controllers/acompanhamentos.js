const sequelize = require('./../../database/sequelize_remote')
const { AcompanhamentosModel } = require('./../models')

class Acompanhamento {

    getAll(req, res) {
        sequelize.query(`SELECT 
                            A.*,
                            PF.NOME FUNCIONARIO_NOME, PF.SOBRENOME FUNCIONARIO_SOBRENOME
                        FROM
                            ACOMPANHAMENTO A
                            LEFT JOIN ACOMPANHAMENTO_FUNCIONARIO AF
                            ON AF.ACOMPANHAMENTO_CODIGO = A.CODIGO
                            LEFT JOIN FUNCIONARIO F
                            ON F.CODIGO_FUNCIONARIO = AF.CODIGO_FUNCIONARIO
                            LEFT JOIN PESSOA PF
                            ON PF.CODIGO = F.PESSOA_CODIGO`,
        )
            .then(result => {
                res.json(result[0])
            })
    }

    getById(req, res) {
        sequelize.query(`SELECT 
                            A.*,    
                                        
                            PF.NOME FUNCIONARIO_NOME, PF.SOBRENOME FUNCIONARIO_SOBRENOME,
                            PR.NOME RESIDENTE_NOME, PR.SOBRENOME RESIDENTE_SOBRENOME,
                            AR.CODIGO_RESIDENTE, AF.CODIGO_FUNCIONARIO
                        FROM
                            ACOMPANHAMENTO A
                            LEFT JOIN ACOMPANHAMENTO_FUNCIONARIO AF
                            ON AF.ACOMPANHAMENTO_CODIGO = A.CODIGO
                            LEFT JOIN FUNCIONARIO F
                            ON F.CODIGO_FUNCIONARIO = AF.CODIGO_FUNCIONARIO
                            LEFT JOIN PESSOA PF
                            ON PF.CODIGO = F.PESSOA_CODIGO
                            LEFT JOIN ACOMPANHAMENTO_RESIDENTE AR
                            ON AR.ACOMPANHAMENTO_CODIGO = A.CODIGO
                            LEFT JOIN RESIDENTE R
                            ON R.CODIGO_RESIDENTE = AR.CODIGO_RESIDENTE
                            INNER JOIN PESSOA PR
                            ON PR.CODIGO = R.PESSOA_CODIGO
                            WHERE A.CODIGO = :ACOMPANHAMENTO_CODIGO`,
            { replacements: { ACOMPANHAMENTO_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    create(req, res) {
        AcompanhamentosModel.create(req.body)
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    update(req, res) {
        AcompanhamentosModel.update(req.body, {
            where: {
                CODIGO: req.params.id
            }
        })
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))

    }
    delete(req, res) {
        AcompanhamentosModel.destroy({
            where: {
                CODIGO: req.params.id
            }
        })
            .then(acompanhamento => res.json(acompanhamento))
            .catch(error => res.json(error))
    }

    getCod(req, res){ sequelize.query(`SELECT MAX(CODIGO+1)as ACOMPANHAMENTO_CODIGO FROM ACOMPANHAMENTO`,


    )
      .then(result => {
        res.json(result[0])
    })

    }
}

module.exports = new Acompanhamento()