//Requires
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')
const sequelize = require('./../../database/sequelize_remote')

//Function that compiles template and data
const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), './reports/templates', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
}

//Function responsible for generating report
//No date report, all data, order by desc
const noDateResidente = async (codigoResidente) => {
    try {
        //Database query
        var result = await sequelize.query(
            `SELECT 
            CONCAT(PR.NOME, ' ', PR.SOBRENOME) AS NOME_RESIDENTE,
            A.ATIVIDADE,
            DATE_FORMAT(A.DATA_ACOMPANHAMENTO, '%d/%m/%Y') AS DATA_ACOMPANHAMENTO,
            CONCAT(PF.NOME, ' ', PF.SOBRENOME) AS NOME_FUNCIONARIO,
            F.CARGO
        FROM
            ACOMPANHAMENTO AS A
                INNER JOIN
            ACOMPANHAMENTO_RESIDENTE AS AR ON A.CODIGO = AR.ACOMPANHAMENTO_CODIGO
                INNER JOIN
            RESIDENTE AS R ON R.CODIGO_RESIDENTE = AR.CODIGO_RESIDENTE
                INNER JOIN
            PESSOA AS PR ON PR.CODIGO = R.PESSOA_CODIGO
                INNER JOIN
            ACOMPANHAMENTO_FUNCIONARIO AS AF ON A.CODIGO = AF.ACOMPANHAMENTO_CODIGO
                INNER JOIN
            FUNCIONARIO AS F ON F.CODIGO_FUNCIONARIO = AF.CODIGO_FUNCIONARIO
                INNER JOIN
            PESSOA AS PF ON PF.CODIGO = F.PESSOA_CODIGO
        WHERE
            AR.CODIGO_RESIDENTE = ${codigoResidente}
        ORDER BY A.DATA_ACOMPANHAMENTO DESC;`
        )

        //Set database result to variable
        acompanhamentos = {
            "acompanhamentos": result[0]
        }

        //Launch puppeteer, create new page, call compile function
        const browser = await puppeteer.launch({
            'args': [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        })
        const page = await browser.newPage()
        const content = await (compile('acompanhamentos-residente', acompanhamentos))

        //Set page content, emulate screen, config page
        await page.setContent(content)
        await page.emulateMedia('screen')
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                left: '10px',
                right: '10px'
            }
        })

        //Log done, close puppeteer, return result
        console.log('done')
        await browser.close()
        return pdf
    } catch (e) {
        console.log(e)
    }
}

module.exports = { noDateResidente }
