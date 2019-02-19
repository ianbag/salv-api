/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:27:38
 * @modify date 2019-02-17 20:06:42
 * @desc Residente Controller
 */
const { ResidenteModel, PessoaModel } = require('./../models')

class Residente {
    get(req, res) {
        ResidenteModel.findAll({ raw: true })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    getById(req, res) {
        ResidenteModel.findByPk(req.params.id)
            .then(residente => res.json(residente))
            .catch(error => res.json(erro))
    }
    create(req, res) {
        ResidenteModel.create(req.body)
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    update(req, res) {
        ResidenteModel.update(req.body, { where: { CODIGO_RESIDENTE: req.params.id } })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        ResidenteModel.destroy({ where: { CODIGO_RESIDENTE: req.params.id } })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
}

module.exports = new Residente()