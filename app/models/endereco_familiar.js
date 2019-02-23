/**
 * author: hppod
 * create: 22/02/2019 22h44
 * file: model/endereco_familiar.js
 */

module.exports = (sequelize, DataTypes) => {
    const EnderecoFamiliarModel = sequelize.define('EnderecoFamiliarModel', {
        FAMILIAR_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'FAMILIAR',
            referencesKey: 'CODIGO'
        },
        ENDERECO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'ENDERECO',
            referencesKey: 'CODIGO'
        }
    },
        {
            tableName: 'ENDERECO_FAMILIAR',
            timestamps: false
        }
    )
    return EnderecoFamiliarModel
}