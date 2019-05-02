const sequelize = require('./../../database/sequelize_remote')
const fs = require('fs')
const pdf = require('dynamic-html-pdf')
const options = {
    format: "A4",
    orientation: "portrait",
    border: '2mm'
}

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
            var funcionarios = {
                "funcionarios": result[0]
            }
            var html = fs.readFileSync('P:/arquivos/fatec/gpes/salv-api/reports/templates/relatorio-de-funcionarios.html', 'utf8')
            var document = {
                type: 'file',
                template: html,
                context: funcionarios,
                path: './../pdf/funcionarios.pdf'
            }
            pdf.create(document, options)
                .then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            // res.send(document)
            // res.send(jsfile)
            res.send('ok')
        }).catch(error => {
            res.json(error)
        })
    }
}

module.exports = new Relatorios()