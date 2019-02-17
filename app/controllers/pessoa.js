/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:29:34
 * @modify date 2019-02-17 13:28:43
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
        res.json('create')
    }
    update(req, res) {
        res.json('update')
    }
    delete(req, res) {
        res.json('delete')
    }
}

module.exports = new Pessoa()