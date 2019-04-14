const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

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
                max: 100,
                allowNull: false
            },
            STATUS: {
                type: Sequelize.TINYINT,
                max: 1,
                allowNull: false,
                defaultValue: 1,
            }
        },
        {
            tableName: 'USUARIO',
            timestamps: false,
            hooks: {
                beforeCreate: async function (UsuarioModel) {
                    const salt = await bcrypt.genSaltSync(10)
                    UsuarioModel.SENHA = await bcrypt.hash(UsuarioModel.SENHA, salt)
                }
            }
        }
    )

    return UsuarioModel
}
