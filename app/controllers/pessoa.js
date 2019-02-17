/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:29:34
 * @modify date 2019-02-17 18:34:31
 * @desc Pessoa Controller
 */

const { PessoaModel } = require('./../models')

class Pessoa {
    get(req, res) {
        PessoaModel.findAll({ raw: true })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    getById(req, res) {
        PessoaModel.findByPk(req.params.id)
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    create(req, res) {
        PessoaModel.create(req.body)
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    update(req, res) {
        PessoaModel.update(req.body, { where: { CODIGO: req.params.id } })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        PessoaModel.destroy({ where: { CODIGO: req.params.id } })
            .then(pessoa => res.json(pessoa))
            .catch(error => res.json(error))
    }
}

module.exports = new Pessoa()