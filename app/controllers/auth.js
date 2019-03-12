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
    console.log(mailUser)

    const dbMail = UsuarioModel.findOne({
        where: {
            EMAIL: mailUser
        }
    })
    .then(mailDb => res.json(mailDb))
    .catch(error => res.json(error))
}

module.exports = handleAuthentication