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
        const acompanhamento = await AcompanhamentosModel.findOne({
            where: {
                CODIGO: codigoAcompanhamento
            }
        })
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

        data_acompanhamento = {
            "acompanhamento": acompanhamento,
            "residentes": residentes,
            "funcionarios": funcionarios
        }

        return data_acompanhamento
    } catch (e) {
        console.log(e)
    }
}

module.exports = { reportAcompanhamento }