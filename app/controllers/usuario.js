/**
 * author: NathanBarsoti8
 */

const sequelize = require('./../../database/sequelize_remote')
const bcrypt = require('bcrypt')


const OP = sequelize.Op

const { UsuarioModel } = require('./../models')

class Usuario {

    getById(req, res) {
        sequelize.query(`SELECT EMAIL, LOGIN, PERMISSAO_ACESSO AS ACESSO FROM USUARIO WHERE CODIGO_FUNCIONARIO = :CODIGO_FUNCIONARIO`,
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
        UsuarioModel.update({ STATUS: 0 }, {
            where: {
                EMAIL: req.params.email,
                STATUS: 1
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    uniqueEmail(req, res) {
        UsuarioModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                EMAIL: req.body.EMAIL,
                CODIGO_FUNCIONARIO: { [OP.ne]: req.body.CODIGO }
            }
        })
            .then(usuario => {
                if (usuario)
                    res.json({ value: 0, message: 'Email não é único!' })

                else
                    res.json({ value: 1, message: 'Email é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueLogin(req, res) {
        UsuarioModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                LOGIN: req.body.LOGIN,
                CODIGO_FUNCIONARIO: { [OP.ne]: req.body.CODIGO }
            }
        })
            .then(usuario => {
                if (usuario)
                    res.json({ value: 0, message: 'Login não é único!' })

                else
                    res.json({ value: 1, message: 'Login é único!' })
            })
            .catch(error => res.json(error))
    }

    uniqueSenha(req, res) {
        UsuarioModel.findOne({
            raw: true,
            where: {
                STATUS: 1,
                SENHA: req.body.SENHA,
                CODIGO_FUNCIONARIO: { [OP.ne]: req.body.CODIGO }
            }
        })
            .then(usuario => {
                if (usuario)
                    res.json({ value: 0, message: 'Senha não é único!' })

                else
                    res.json({ value: 1, message: 'Senha é único!' })
            })
            .catch(error => res.json(error))
    }

}

module.exports = new Usuario()