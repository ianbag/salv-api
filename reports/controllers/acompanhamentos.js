//Requires
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')
const sequelize = require('./../../database/sequelize_remote')

//Function that compiles the template and data
const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), './reports/templates', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
}

//Function responsible for generating report
//No date report, all data
const noDate = async () => {
    try {
        //Database query
        var result = await sequelize.query(
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
        const content = await (compile('acompanhamentos', acompanhamentos))

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

//Function responsible for generating report
//Date start report, all data
const dateStart = async (dateStart) => {
    try {
        //Database query
        var result = await sequelize.query(
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
            WHERE A.DATA_ACOMPANHAMENTO BETWEEN '${dateStart}' AND NOW()
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
        const content = await (compile('acompanhamentos', acompanhamentos))

        //Set page, emulate screen, config page
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

//Function responsible for generating report
//Date start and date finish report, all data
const dateStartAndDateFinish = async (dateStart, dateFinish) => {
    try {
        //Database query
        var result = await sequelize.query(
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
        WHERE
            A.DATA_ACOMPANHAMENTO BETWEEN '${dateStart}' AND '${dateFinish}'
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
        const content = await (compile('acompanhamentos', acompanhamentos))

        //Set page, emulate screen, config page
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

module.exports = { noDate, dateStart, dateStartAndDateFinish }