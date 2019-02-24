/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:46:04
 * @modify date 2019-02-20 19:46:04
 * @desc Arquivo Controller da API de Telefone Pessoa
 */
const { TelefonePessoaModel } = require('./../models')

class TelefonePessoa {
    getById(req, res) {
        TelefonePessoaModel.findByPk(req.params.id)
            .then(TelefonePessoa => res.json(TelefonePessoa))
            .catch(error => res.json(error))
    }

    create(req, res) {
        TelefonePessoaModel.create(req.body)
            .then(TelefonePessoa => res.json(TelefonePessoa))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        TelefonePessoaModel.destroy({ where: { PESSOA_CODIGO: req.params.id } })
            .then(TelefonePessoa => res.json(TelefonePessoa))
            .catch(error => res.json(error))
    }
}

module.exports = new TelefonePessoa() 