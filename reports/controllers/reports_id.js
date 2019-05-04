//Requires
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')
const sequelize = require('./../../database/sequelize_remote')
const { PessoaModel, FuncionarioModel, DependenteModel, TelefoneModel, EnderecoModel, TelefonePessoaModel, EnderecoPessoaModel, AcompanhamentosModel, AcompanhamentoResidenteModel, AcompanhamentoFuncionarioModel, ResidenteModel, ConvenioModel, EnderecoConvenioModel, TelefoneConvenioModel } = require('./../../app/models')


//Variable that receives the objects from database
var data_acompanhamento;

//Function that compiles the template and data
const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), './reports/templates', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
}

//Function responsible for generating report
const reportAcompanhamento = async (codigoAcompanhamento) => {
    try {
        //Database query
        const acompanhamento = await AcompanhamentosModel.findOne({
            where: {
                CODIGO: codigoAcompanhamento
            }
        })
        //Database query
        const residentes = await ResidenteModel.findAll({
            include: [
                { model: PessoaModel, as: 'PESSOA' },
                {
                    model: AcompanhamentoResidenteModel, as: 'ACOMPANHAMENTO_RESIDENTE',
                    where: {
                        ACOMPANHAMENTO_CODIGO: codigoAcompanhamento
                    }
                }
            ]
        })
        //Database query
        const funcionarios = await FuncionarioModel.findAll({
            include: [
                { model: PessoaModel, as: 'PESSOA' },
                {
                    model: AcompanhamentoFuncionarioModel, as: 'ACOMPANHAMENTO_FUNCIONARIO',
                    where: {
                        ACOMPANHAMENTO_CODIGO: codigoAcompanhamento
                    }
                }
            ]
        })

        //Set database result to variable
        data_acompanhamento = {
            "acompanhamento": acompanhamento,
            "residentes": residentes,
            "funcionarios": funcionarios
        }

        //Launch puppeteer, create new page, call compile function
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await compile('acompanhamento', data_acompanhamento)

        //Set page content, emulate screen, config page
        await page.setContent(content)
        await page.emulateMedia('print')
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
};

module.exports = { reportAcompanhamento }