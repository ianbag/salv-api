//Requires
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const sequelize = require('./../../database/sequelize_remote');

//Variable that receives the objects from database
var funcionarios;
var convenios;
var acompanhamentos;
var residentes;

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

//Function responsible for generating report
const reportConvenio = async () => {
    try {
        //Database query
        var result = await sequelize.query(
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
        )

        //Set database result to variable
        convenios = {
            "convenios": result[0]
        }

        //Launch puppeteer, create new page, call compile function
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await (compile('convenios', convenios))

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
        console.log(convenios)
        await browser.close()
        return pdf

    } catch (e) {
        console.log(e)
    }
}

//Function responsible for generating report
const reportAcompanhamento = async () => {
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
        ORDER BY A.DATA_ACOMPANHAMENTO;`
        )

        //Set database result to variable
        acompanhamentos = {
            "acompanhamentos": result[0]
        }

        //Launch puppeteer, create new page, call compile function
        const browser = await puppeteer.launch()
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

const reportResidente = async () => {
    try {
        //Database query
        var result = await sequelize.query(
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
        )
            
        //Set database result to variable
        residentes = {
            "residentes": result[0]
        }

        //Launch puppeteer, create new page, call compile function
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await (compile('residentes', residentes))

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

//Exports function reportFuncionario
module.exports = { reportFuncionario, reportConvenio, reportAcompanhamento, reportResidente }