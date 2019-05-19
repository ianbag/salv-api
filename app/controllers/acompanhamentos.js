const sequelize = require('./../../database/sequelize_remote')
const { AcompanhamentosModel } = require('./../models')

class Acompanhamento {

    getAll(req, res) {
        sequelize.query(`SELECT 
                            A.*
                            
                        FROM
                            ACOMPANHAMENTO A
                            
                            `,
        )
            .then(result => {
                res.json(result[0])
            })
    }

    getById(req, res) {
        sequelize.query(`SELECT 
                            A.*,                                            
                            PF.NOME FUNCIONARIO_NOME , 
                            PR.NOME RESIDENTE_NOME ,
                            AR.CODIGO_RESIDENTE, AF.CODIGO_FUNCIONARIO
                        FROM
                            ACOMPANHAMENTO A
                            INNER JOIN ACOMPANHAMENTO_FUNCIONARIO AF
                            ON AF.ACOMPANHAMENTO_CODIGO = A.CODIGO
                            INNER JOIN FUNCIONARIO F
                            ON F.CODIGO_FUNCIONARIO = AF.CODIGO_FUNCIONARIO
                            INNER JOIN PESSOA PF
                            ON PF.CODIGO = F.PESSOA_CODIGO
                            INNER JOIN ACOMPANHAMENTO_RESIDENTE AR
                            ON AR.ACOMPANHAMENTO_CODIGO = A.CODIGO
                            INNER JOIN RESIDENTE R
                            ON R.CODIGO_RESIDENTE = AR.CODIGO_RESIDENTE
                            INNER JOIN PESSOA PR
                            ON PR.CODIGO = R.PESSOA_CODIGO
                            WHERE A.CODIGO = :ACOMPANHAMENTO_CODIGO`,
            { replacements: { ACOMPANHAMENTO_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    getResidenteByIdAc(req, res) {
        sequelize.query(`SELECT R.CODIGO_RESIDENTE, P.NOME, P.SOBRENOME FROM PESSOA AS P
        INNER JOIN RESIDENTE AS R
        ON P.CODIGO = R.PESSOA_CODIGO
        INNER JOIN ACOMPANHAMENTO_RESIDENTE AS AR
        ON R.CODIGO_RESIDENTE = AR.CODIGO_RESIDENTE
        INNER JOIN ACOMPANHAMENTO AS A
        ON AR.ACOMPANHAMENTO_CODIGO = A.CODIGO
        WHERE A.CODIGO = :ACOMPANHAMENTO_CODIGO`,
            { replacements: { ACOMPANHAMENTO_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    getFuncionarioByIdAc(req, res) {
        sequelize.query(`SELECT F.CODIGO_FUNCIONARIO, P.NOME as FNOME, P.SOBRENOME FROM PESSOA AS P
        INNER JOIN FUNCIONARIO AS F
        ON P.CODIGO = F.PESSOA_CODIGO
        INNER JOIN ACOMPANHAMENTO_FUNCIONARIO AS AF
        ON F.CODIGO_FUNCIONARIO = AF.CODIGO_FUNCIONARIO
        INNER JOIN ACOMPANHAMENTO AS A
        ON AF.ACOMPANHAMENTO_CODIGO = A.CODIGO
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

    getCod(req, res) {


        var cod = 'SELECT MAX(CODIGO+1) as ACOMPANHAMENTO_CODIGO FROM ACOMPANHAMENTO'


        sequelize.query(cod)
            .then(result => {
                res.json(result[0])
            })

    }

    getAcompanhamento(req, res) {
        sequelize.query(
            `SELECT A.ATIVIDADE
            FROM ACOMPANHAMENTO AS A
            WHERE A.CODIGO = :CODIGO`,
            { replacements: { CODIGO: req.params.codigo } }
        )
            .then((atividade) => {
                res.json(atividade[0])
            }).catch((error) => res.json(error))
    }
}

module.exports = new Acompanhamento()