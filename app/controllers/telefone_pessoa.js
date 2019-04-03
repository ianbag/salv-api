/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:46:04
 * @modify date 2019-03-12 23:56:08
 * @desc Arquivo Controller da API de Telefone Pessoa
 */
const { TelefonePessoaModel, TelefoneModel, PessoaModel } = require('./../models')

TelefonePessoaModel.belongsTo(TelefoneModel, { as: 'TELEFONE', foreignKey: 'TELEFONE_CODIGO' })
TelefonePessoaModel.belongsTo(PessoaModel, { as: 'PESSOA', foreignKey: 'PESSOA_CODIGO' })

class TelefonePessoa {
    getById(req, res) {
        TelefonePessoaModel.findAll({
            where: {
                PESSOA_CODIGO: req.params.id
            },
            include: [
                { model: TelefoneModel, as: 'TELEFONE' },
                { model: PessoaModel, as: 'PESSOA' }
            ]
        })
            .then(TelefonePessoa => res.json(TelefonePessoa))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefonePessoaModel.create(req.body)
            .then(TelefonePessoa => res.json(TelefonePessoa))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        TelefonePessoaModel.destroy({
            where: {
                PESSOA_CODIGO: req.params.pessoaId,
                TELEFONE_CODIGO: req.params.telefoneId
            }
        })
            .then(TelefonePessoa => res.json(TelefonePessoa))
            .catch(error => res.json(error))
    }
}

module.exports = new TelefonePessoa() 