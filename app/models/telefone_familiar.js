/**
 * author: hppod
 * create: 21/02/2019 14h21
 * file: model/telefone_familiar.js
 */

module.exports = (sequelize, DataTypes) => {
    const TelefoneFamiliarModel = sequelize.define('TelefoneFamiliarModel', {
        FAMILIAR_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        TELEFONE_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        }
    },
        {
            tableName: 'TELEFONE_FAMILIAR',
            timestamps: false
        }
    )
    return TelefoneFamiliarModel
}