/**
 * author: hppod
 * create: 09/03/2019 21h29
 * file: controllers/auth.js
 */

const UsuarioController = require('./../controllers/usuario')

const handleAuthentication = (req, res) => {
    const user = req.body

    if (isValid(user)) {

    } else {
        res.status(403).json({ message: 'Dados Inválidos' })
    }
}

function isValid(user) {
    if (!user) {
        return false
    }

    const dbUser = UsuarioController.getByMail(user.email)
}

module.exports = handleAuthentication