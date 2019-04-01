/**
 * author: NathanBarsoti8
 */

const { DependenteModel } = require('./../models')

class Dependente {

    getById(req, res) {
        DependenteModel.findAll({
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    create(req, res) {
        DependenteModel.create(req.body)
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    update(req, res) {
        DependenteModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

    delete(req, res) {
        DependenteModel.update({ STATUS: 1 }, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(dependente => res.json(dependente))
            .catch(error => res.json(error))
    }

}

module.exports = new Dependente()