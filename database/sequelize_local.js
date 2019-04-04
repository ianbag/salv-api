const Sequelize = require('sequelize')

const sequelize = new Sequelize('salv-bd-0309', 'root', '',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
})

module.exports = sequelize