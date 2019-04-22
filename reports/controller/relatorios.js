const sequelize = require('./../../database/sequelize_remote')
const request = require('request')
const REPORT_API = 'http://localhost:3660/api/report'
class Relatorios {

    funcionarios(req, res) {
        sequelize.query(
            `SELECT 
            P.NOME,
            P.SOBRENOME,
            MASK(P.RG, '##.###.###-#') AS RG,
            MASK(P.CPF, '###.###.###-##') AS CPF,
            DATE_FORMAT(P.DATA_NASCIMENTO, '%d/%m/%Y') AS DATA_NASCIMENTO,
            F.CARGO,
            DATE_FORMAT(F.DATA_ADMISSAO, '%d/%m/%Y') AS DATA_ADMISSAO
        FROM
            PESSOA AS P
                INNER JOIN
            FUNCIONARIO AS F ON F.PESSOA_CODIGO = P.CODIGO
        WHERE
            F.STATUS = 1
        ORDER BY P.NOME;`
        ).then(result => {

            var data = {
                "template": { "name": "relatorio-de-funcionarios" },
                "data": {
                    "funcionarios": result[0]
                },
                options: {
                    preview: true
                }
            }

            var options = {
                uri: REPORT_API,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: data
            }
            //res.send(data)
            request(options).pipe(res)
        }).catch(error => res.json(error))
    }

    acompanhamentos(req, res) {
        sequelize.query(
            `SELECT 
            DATE_FORMAT(A.DATA_ACOMPANHAMENTO, '%d/%m/%Y') AS DATA_ACOMPANHAMENTO,
            A.ATIVIDADE,
            (SELECT 
                    COUNT(CODIGO_RESIDENTE)
                FROM
                    ACOMPANHAMENTO_RESIDENTE
                WHERE
                    ACOMPANHAMENTO_CODIGO = A.CODIGO) AS NUMERO_RESIDENTES_PARTICIPANTES,
            (SELECT 
                    COUNT(CODIGO_FUNCIONARIO)
                FROM
                    ACOMPANHAMENTO_FUNCIONARIO
                WHERE
                    ACOMPANHAMENTO_CODIGO = A.CODIGO) AS NUMERO_FUNCIONARIOS_PARTICIPANTES
        FROM
            ACOMPANHAMENTO AS A
        ORDER BY A.DATA_ACOMPANHAMENTO;`
        ).then(result => {

            var data = {
                "template": { "name": "relatorio-de-acompanhamentos" },
                "data": {
                    "acompanhamentos": result[0]
                },
                options: {
                    preview: true
                }
            }

            var options = {
                uri: REPORT_API,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: data
            }

            request(options).pipe(res)
        }).catch(error => res.json(error))
    }

    convenios(req, res) {
        sequelize.query(
            `SELECT 
            C.NOME_CONVENIO,
            C.TIPO_CONVENIO,
            T.DDD AS DDD,
            IF(CHARACTER_LENGTH(T.NUMERO = '9'),
                MASK(T.NUMERO, '#####-####'),
                MASK(T.NUMERO, '####-####')) AS NUMERO
        FROM
            CONVENIO AS C
                INNER JOIN
            TELEFONE_CONVENIO AS TC ON TC.CONVENIO_CODIGO = C.CODIGO
                INNER JOIN
            TELEFONE AS T ON T.CODIGO = TC.TELEFONE_CODIGO
        WHERE
            C.STATUS = 1
        ORDER BY C.NOME_CONVENIO;`
        ).then(result => {

            var data = {
                "template": { "name": "relatorio-de-convenios" },
                "data": {
                    "convenios": result[0]
                },
                options: {
                    preview: true
                }
            }

            var options = {
                uri: REPORT_API,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: data
            }

            request(options).pipe(res)
        }).catch(error => res.json(error))
    }

    residentes(req, res) {
        sequelize.query(
            `SELECT 
            P.NOME,
            P.SOBRENOME,
            IF(P.DATA_NASCIMENTO, DATE_FORMAT(P.DATA_NASCIMENTO, "%d/%m/%Y"), "Não especificado") AS DATA_NASCIMENTO,
            R.APELIDO,
            DATE_FORMAT(R.DATA_ACOLHIMENTO, "%d/%m/%Y") AS DATA_ACOLHIMENTO
        FROM
            PESSOA AS P
                INNER JOIN
            RESIDENTE AS R ON P.CODIGO = R.PESSOA_CODIGO
        WHERE
            P.STATUS = 1 AND R.STATUS = 1
        ORDER BY P.NOME;`
        ).then(result => {

            var data = {
                "template": { "name": "relatorio-de-residentes" },
                "data": {
                    "residentes": result[0]
                },
                options: {
                    preview: true
                }
            }

            var options = {
                uri: REPORT_API,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                json: data
            }

            request(options).pipe(res)
        }).catch(error => res.json(error))
    }

}

module.exports = new Relatorios()