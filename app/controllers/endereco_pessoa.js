/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-24 14:00:28
 * @modify date 2019-02-24 14:35:45
 * @desc Arquivo Controller da API de Endereco Pessoa
 */

const { EnderecoPessoaModel, PessoaModel, EnderecoModel } = require('./../models')

EnderecoPessoaModel.belongsTo(EnderecoModel, { as: 'ENDERECO', foreignKey: 'ENDERECO_CODIGO' })
EnderecoPessoaModel.belongsTo(PessoaModel, { as: 'PESSOA', foreignKey: 'PESSOA_CODIGO' })

class EnderecoPessoa {
    getById(req, res) {
        EnderecoPessoaModel.findAll({
            where: {
                PESSOA_CODIGO: req.params.id
            },
            include: [
                { model: EnderecoModel, as: 'ENDERECO' },
                { model: PessoaModel, as: 'PESSOA' }
            ]
        })
            .then(EnderecoPessoa => res.json(EnderecoPessoa))
            .catch(error => res.json(error))
    }

    create(req, res) {
        EnderecoPessoaModel.create(req.body)
            .then(enderecoPessoa => res.json(enderecoPessoa))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        EnderecoPessoaModel.destroy({
            where: {
                PESSOA_CODIGO: req.params.pessoaId,
                ENDERECO_CODIGO: req.params.enderecoId
            }
        })
            .then(enderecoPessoa => res.json(enderecoPessoa))
            .catch(error => res.json(error))
    }
}

module.exports = new EnderecoPessoa()
