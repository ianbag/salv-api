const sequelize = require('./../../database/sequelize_remote')
const request = require('request')

class Relatorios {

    funcionarios(req, res){
        sequelize.query(
            `SELECT P.NOME, P.SOBRENOME, MASK(P.RG, "##.###.###-#") AS RG, MASK(P.CPF, "###.###.###-##") AS CPF, DATE_FORMAT(P.DATA_NASCIMENTO, "%d/%m/%Y") AS DATA_NASCIMENTO, F.CARGO, DATE_FORMAT(F.DATA_ADMISSAO, "%d/%m/%Y") AS DATA_ADMISSAO 
            FROM PESSOA AS P
            INNER JOIN FUNCIONARIO AS F
            ON F.PESSOA_CODIGO = P.CODIGO
            WHERE F.STATUS = 1
            ORDER BY P.DATA_NASCIMENTO`
        ).then(result => {
            
            var data = {
                "template": {"name": "funcionarios-template"},
                "data": {
                    "funcionarios": result[0]
                },
                options:{
                    preview: true
                }
            }

            var options = {
                uri: 'http://localhost:3660/api/report',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: data
            }
            //res.send(data)
            request(options).pipe(res)
        })
    }

}

module.exports = new Relatorios()