const Sequelize = require('sequelize')
let sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
    host: "mysql995.umbler.com",
    port: "41890",
    dialect: "mysql"
})
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../models/usuario')(sequelize, DataTypes)

const handleAuthentication = (req, res) => {
    const mailUser = req.body.email

    UsuarioModel.findOne({
        where: {
            EMAIL: mailUser
        }
    })
        .then((login) => {
            if (!login) {
                res.status(403).json({ err: 'Dados Inválidos' })
            }
            const senha = req.body.senha
            
            if (senha != login.SENHA) {
                res.status(400).json({ err: 'Senha Incorreta' })
            } else {
                res.status(200).json({ message: 'Dados Corretos, AUTORIZADO' })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ err: err })
        })

}

module.exports = handleAuthentication