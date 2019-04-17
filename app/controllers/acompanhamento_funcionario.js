const sequelize = require('./../../database/sequelize_remote')

const { AcompanhamentoFuncionarioModel } = require('./../models/')

class AcompanhamentoFuncionario {

    getById(req, res) {
        sequelize.query(`SELECT
                            A.CODIGO,
                            P.NOME, P.SOBRENOME,
                            F.CARGO
                        FROM
                            ACOMPANHAMENTO A
                            LEFT JOIN ACOMPANHAMENTO_FUNCIONARIO AF
                            ON AF.ACOMPANHAMENTO_CODIGO = A.CODIGO
                            LEFT JOIN FUNCIONARIO F
                            ON F.CODIGO_FUNCIONARIO = AF.CODIGO_FUNCIONARIO
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = F.PESSOA_CODIGO
                            WHERE A.CODIGO = :ACOMPANHAMENTO_CODIGO`,
            { replacements: { ACOMPANHAMENTO_CODIGO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
    }

    create(req, res) {
        let count = 0;
        req.body.forEach((element, index, array) => {
            AcompanhamentoFuncionarioModel.create(element)
                .then(() => {
                    count++
                    if(count == array.length)
                        res.json({ message: `Foram adicionados ${count} Acompanhamentos Funcionarios` })
                })
                .catch(error => res.json(error))
        })
    }

    delete(req, res){ 
        let idFu = req.params.idFuncionario
        let idAc = req.params.idAcompanhamento
        let deleteAc = 'DELETE FROM ACOMPANHAMENTO_FUNCIONARIO WHERE CODIGO_FUNCIONARIO = "' + idFu + '"  AND ACOMPANHAMENTO_CODIGO = "' + idAc + '" '

      sequelize.query(deleteAc)
       .then(result => {
           res.json(result[0])
           })
        }      
        


}
module.exports = new AcompanhamentoFuncionario()