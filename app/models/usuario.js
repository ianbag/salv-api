/**
 * author: NathanBarsoti8
 */

 module.exports = (sequelize, DataTypes) => {
     const UsuarioModel = sequelize.define('UsuarioModel',
     {

        FUNCIONARIO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: 'FUNCIONARIO',
            referenceskey: 'CODIGO'
        },
        EMAIL: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        LOGIN: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        SENHA: {
            type: DataTypes.STRING,
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

