const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const sequelize = require('./../../database/sequelize_remote');
const hbs = require('handlebars');
const path = require('path');
var funcionarios;
const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), './../templates', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
};

(async function () {
    try {
        var result = await sequelize.query(`
        SELECT 
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
    ORDER BY P.NOME;`)
        funcionarios = {
            "funcionarios": result[0]
        }

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await compile('funcionarios', funcionarios)

        await page.setContent(content)
        await page.emulateMedia('screen')
        const pdf = await page.pdf({
            path: './../pdf/funcionarios.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                left: '10px',
                right: '10px'
            }
        })

        console.log('done')
        await browser.close()
        process.exit()
        return pdf
    } catch (e) {
        console.log(e)
    }
})();
