/**
 * author: hppod
 * create: 18/02/2019 15h42
 * file: model/familiar.js
 * descrition: Arquivo model da API "familiar"
 */

module.exports = (sequelize, DataTypes) => {
    const FamiliarModel = sequelize.define('FamiliarModel', {
        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NOME: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        SOBRENOME: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        PARENTESCO: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        }
    },
        {
            tableName: 'FAMILIAR',
            timestamps: false
        }
    )
    return FamiliarModel
}