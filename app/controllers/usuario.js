/**
 * author: NathanBarsoti8
 */

const sequelize = require('./../../database/sequelize_remote')

const { UsuarioModel } = require('./../models')

class Usuario {

    getById(req, res) {
        sequelize.query(`SELECT EMAIL, LOGIN FROM USUARIO WHERE CODIGO_FUNCIONARIO = :CODIGO_FUNCIONARIO`,
            { replacements: { CODIGO_FUNCIONARIO: req.params.id } })
            .then(result => {
                res.json(result[0])
            })
            .catch(error => res.json(error))
    }

    create(req, res) {
        UsuarioModel.create(req.body)
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    update(req, res) {
        UsuarioModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 1
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }


    delete(req, res) {
        UsuarioModel.update({ STATUS: 1 }, {
            where: {
                EMAIL: req.params.email,
                STATUS: 0
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }
}

module.exports = new Usuario()