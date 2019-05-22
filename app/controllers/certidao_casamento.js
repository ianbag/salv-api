/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-05-22 00:32:49
 * @modify date 2019-05-22 00:32:49
 * @desc Arquivo de controller da API de Certidão de Casamento
 */

const sequelize = require('./../../database/sequelize_remote');
const { CertidaoCasamentoModel } = require('./../models');

class CertidaoCasamento {

    get(req, res) {
        CertidaoCasamentoModel.findAll({
            raw: true,
        })
            .then(certidaoCasamento => res.json(certidaoCasamento))
            .catch(error => res.json(error))
    }

    getById(req, res) {
        CertidaoCasamentoModel.findOne({
            where: { 
                CODIGO_RESIDENTE: req.params.id
            } 
        })
            .then(certidaoCasamento => res.json(certidaoCasamento))
            .catch(error => res.json(error))
    }

    create(req, res) {
        CertidaoCasamentoModel.create(req.body)
            .then(certidaoCasamento => res.json(certidaoCasamento))
            .catch(error => res.json(error))
    }

    update(req, res) {
        CertidaoCasamentoModel.update(req.body, {
            where: {
                CODIGO_RESIDENTE: req.params.id,
            }
        })
            .then(certidaoCasamento => res.json(certidaoCasamento))
            .catch(error => res.json(error))
    }

}

module.exports = new CertidaoCasamento()