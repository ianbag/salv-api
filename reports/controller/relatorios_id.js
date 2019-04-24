const sequelize = require('./../../database/sequelize_remote')
const request = require('request')
const REPORT_API = 'http://localhost:3660/api/report'

const { PessoaModel, FuncionarioModel, DependenteModel, TelefoneModel, EnderecoModel, TelefonePessoaModel, EnderecoPessoaModel, AcompanhamentosModel, AcompanhamentoResidenteModel, AcompanhamentoFuncionarioModel, ResidenteModel } = require('./../../app/models')

class Relatorios_ID {

    funcionario(req, res) {
        const pessoa = PessoaModel.findOne({
            where: {
                CODIGO: req.params.codigoPessoa
            }
        })
        const enderecos = EnderecoPessoaModel.findAll({
            where: {
                PESSOA_CODIGO: req.params.codigoPessoa
            },
            include: {
                model: EnderecoModel, as: 'ENDERECO'
            }

        })
        const telefones = TelefonePessoaModel.findAll({
            where: {
                PESSOA_CODIGO: req.params.codigoPessoa
            },
            include: {
                model: TelefoneModel, as: 'TELEFONE'
            }
        })
        const funcionario = FuncionarioModel.findOne({
            where: {
                CODIGO_FUNCIONARIO: req.params.codigoFuncionario
            }
        })
        const dependentes = DependenteModel.findAll({
            where: {
                CODIGO_FUNCIONARIO: req.params.codigoFuncionario,
                STATUS: 1
            }
        })

        Promise
            .all([pessoa, enderecos, telefones, funcionario, dependentes])
            .then(responses => {

                var data = {
                    "template": { "name": "relatorio-de-funcionario" },
                    "data": {
                        "pessoa": responses[0],
                        "enderecos": responses[1],
                        "telefones": responses[2],
                        "funcionario": responses[3],
                        "dependentes": responses[4]
                    },
                    options: {
                        preview: false
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
                // res.send(data.data)
            }).catch(error => res.json(error))
    }

    acompanhamento(req, res) {
        const acompanhamento = AcompanhamentosModel.findOne({
            where: {
                CODIGO: req.params.codigoAcompanhamento
            }
        })
        const residentes = ResidenteModel.findAll({
            include: [
                { model: PessoaModel, as: 'PESSOA' },
                {
                    model: AcompanhamentoResidenteModel, as: 'ACOMPANHAMENTO_RESIDENTE',
                    where: {
                        ACOMPANHAMENTO_CODIGO: req.params.codigoAcompanhamento
                    }
                }
            ]
        })
        const funcionarios = FuncionarioModel.findAll({
            include: [
                { model: PessoaModel, as: 'PESSOA' },
                {
                    model: AcompanhamentoFuncionarioModel, as: 'ACOMPANHAMENTO_FUNCIONARIO',
                    where: {
                        ACOMPANHAMENTO_CODIGO: req.params.codigoAcompanhamento
                    }
                }
            ]
        })

        Promise
            .all([acompanhamento, residentes, funcionarios])
            .then(responses => {

                var data = {
                    "template": { "name": "relatorio-de-acompanhamento" },
                    "data": {
                        "acompanhamento": responses[0],
                        "residentes": responses[1],
                        "funcionarios": responses[2]
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
                // res.send(data)
                request(options).pipe(res)
            })/*.catch(error => res.json(error))*/
    }

}

module.exports = new Relatorios_ID()