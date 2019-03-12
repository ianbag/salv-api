/**
 * author: NathanBarsoti8
 */
const Sequelize = require('sequelize')
 
module.exports = (sequelize, DataTypes) => {
    const UsuarioModel = sequelize.define('UsuarioModel',
        {

            CODIGO_FUNCIONARIO: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                allowNull: false,
                references: 'FUNCIONARIO',
                referenceskey: 'CODIGO'
            },
            EMAIL: {
                type: Sequelize.STRING,
                required: true,
                max: 100,
                allowNull: false
            },
            LOGIN: {
                type: Sequelize.STRING,
                required: true,
                max: 100,
                allowNull: false
            },
            SENHA: {
                type: Sequelize.STRING,
                required: true,
                max: 25,
                allowNull: false
            }
        },
        {
            tableName: 'USUARIO',
            timestamps: false
        }
    )

    return UsuarioModel
}

