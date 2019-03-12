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
            },
       STATUS: {
            type: Sequelize.TINYINT,
            max: 1,
            allowNull: false,
            defaultValue: 0,
        }
        },
        {
            tableName: 'USUARIO',
            timestamps: false
        }
    )

    return UsuarioModel
}
