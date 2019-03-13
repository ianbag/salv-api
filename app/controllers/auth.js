const Sequelize = require('sequelize')
let sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
    host: "mysql995.umbler.com",
    port: "41890",
    dialect: "mysql"
})
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../models/usuario')(sequelize, DataTypes)
const bcrypt = require('bcrypt')

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
            const senhaEncriptada = login.SENHA

            console.log(`SENHA DIGITADA: ${senha} || SENHA DO BANCO: ${senhaEncriptada}`)

            bcrypt.compare(senhaEncriptada, senha, function(err, res){
                if(err){
                    console.log(err)
                }else{
                    console.log(res)
                }
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ err: err })
        })

}

module.exports = handleAuthentication




