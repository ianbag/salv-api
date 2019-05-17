//REMOTO
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
//     host: "mysql995.umbler.com",
//     port: "41890",
//     dialect: "mysql"
// })

// module.exports = sequelize

//LOCAL
const Sequelize = require('sequelize')

const sequelize = new Sequelize('salv-bd', 'root', null, {
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql"
})

module.exports = sequelize