/**
 * author: hppod
 * create: 19/02/2019 23h36
 * file: model/endereco.js
 */

module.exports = (sequelize, DataTypes) => {
    const EnderecoModel = sequelize.define('EnderecoModel', {
        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ENDERECO: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        NUMERO: {
            type: DataTypes.STRING,
            required: true,
            max: 5,
            allowNull: false
        },
        BAIRRO: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false,
        },
        COMPLEMENTO: {
            type: DataTypes.STRING,
            required: false,
            max: 50,
            allowNull: true
        },
        CIDADE: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        ESTADO: {
            type: DataTypes.STRING,
            required: true,
            max: 2,
            allowNull: false
        },
        CEP: {
            type: DataTypes.STRING,
            required: true,
            max: 8,
            allowNull: false
        },
        REFERENCIA: {
            type: DataTypes.STRING,
            required: false,
            max: 100,
            allowNull: true
        }
    },
        {
            tableName: 'ENDERECO',
            timestamps: false
        }
    )
    return EnderecoModel
}