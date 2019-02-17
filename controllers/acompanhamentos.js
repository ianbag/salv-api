const { AcompanhametosModel } = require('./../models')

class Acompanhamentos {
    get(req, res) {
        AcompanhamentosModel.findAll({ raw: true })
            .then(acompnhamento => res.json(acompnhamento))
            .catch(error => res.json(error))
    }
    getById(req, res) {
        AcompanhamentosModel.findByPk(req.params.id)
            .then(acompnhamento => res.json(acompnhamento))
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