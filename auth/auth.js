const Sequelize = require('sequelize')
let sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
    host: "mysql995.umbler.com",
    port: "41890",
    dialect: "mysql"
})
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../app/models/usuario')(sequelize, DataTypes)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const apiConfig = require('./../config/api-config')

const handleAuthentication = (req, res) => {
    const mailUser = req.body.email

    UsuarioModel.findOne({
        where: {
            EMAIL: mailUser
        }
    })
        .then((login) => {
            if (!login) {
                res.status(403).json({ message: "Dados Inválidos" })
            }
            const senha = req.body.senha
            bcrypt.compare(senha, login.SENHA, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        sub: mailUser,
                        iss: "salv-api"
                    }, apiConfig.secret)
                    res.status(200).json({ message: "Autenticado com sucesso", accessToken: token })
                } else {
                    res.status(403).json({ message: "Não autenticado. Verifique seus dados" })
                }
            })

        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ err: err })
        })

}

module.exports = handleAuthentication