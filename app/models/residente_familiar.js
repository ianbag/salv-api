/**
 * author: hppod
 * create: 23/02/2019 00h42
 * file: model/residente_familiar.js
 */

module.exports = (sequelize, DataTypes) => {
    const ResidenteFamiliarModel = sequelize.define('ResidenteFamiliarModel', {
        FAMILIAR_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'FAMILIAR',
            referencesKey: 'CODIGO'
        },
        RESIDENTE_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'RESIDENTE',
            referencesKey: 'CODIGO_RESIDENTE'
        }
    },
        {
            tableName: 'RESIDENTE_FAMILIAR',
            timestamps: false
        }
    )
    return ResidenteFamiliarModel
}