/**
 * author: hppod
 * create: 09/03/2019 21h29
 * file: controllers/auth.js
 */

const { UsuarioModel } = require('./../models')

class Auth {

    post(req, res) {
        res.json({message: "Rota funcionando"})
    }
}

module.exports = new Auth()