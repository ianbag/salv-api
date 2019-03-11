/**
 * author: NathanBarsoti8
 */

 module.exports = (sequelize, DataTypes) => {
     const UsuarioModel = sequelize.define('UsuarioModel',
     {
        CODIGO_FUNCIONARIO: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: 'FUNCIONARIO',
            referenceskey: 'CODIGO_FUNCIONARIO'
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
        },
        STATUS: {
            type: DataTypes.TINYINT,
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

