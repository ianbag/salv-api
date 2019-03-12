/**
 * author: hppod
 * create: 18/02/2019 15h42
 * file: model/familiar.js
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
        },
        STATUS: {
            type: DataTypes.TINYINT,
            max: 1,
            allowNull: false,
            defaultValue: 0,
        }
    },
        {
            tableName: 'FAMILIAR',
            timestamps: false
        }
    )
    return FamiliarModel
}