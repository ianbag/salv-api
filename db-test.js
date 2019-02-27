const Sequelize = require('sequelize')
const sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
    host: "mysql995.umbler.com",
    port: 41890,
    dialect: "mysql"
})

sequelize.authenticate().then(function () {
    console.log("Conexão realizada com sucesso")
}).catch(function (error) {
    console.log("Falha ao se conectar: " + error)
})