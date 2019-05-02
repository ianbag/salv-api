//Requires
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const sequelize = require('./../../database/sequelize_remote');

//Variable that receives the objects from database
var funcionarios;

//Function that compiles the template and data
const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), './reports/templates', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
};

//Function responsible for generating report
const reportFuncionario = async () => {
    try {
        //Database query
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

        //Set database result to variable
        funcionarios = {
            "funcionarios": result[0]
        }

        //Launch puppeteer, create new page, call compile function
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await compile('funcionarios', funcionarios)

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
        //Log error
        console.log(e)
    }
};

//Exports function reportFuncionario
module.exports = reportFuncionario