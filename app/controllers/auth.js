/**
 * author: hppod
 * create: 09/03/2019 21h29
 * file: controllers/auth.js
 */

const { UsuarioModel } = require('./../models')

class Auth {

    login(req, res) {
        const user = req.body

        if (isValid(user)) {
            
        } else {
            res.status(403).json({ message: 'Dados Inválidos' })
        }
    }
}

function isValid(user) {
    return false
}

module.exports = new Auth()