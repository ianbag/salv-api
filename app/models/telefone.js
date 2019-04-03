/**
 * author: hppod
 * create: 20/02/2019 01h03
 * file: model/telefone.js
 */

module.exports = (sequelize, DataTypes) => {
    const TelefoneModel = sequelize.define('TelefoneModel', {
        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        DDD: {
            type: DataTypes.STRING,
            max: 3,
        },
        NUMERO: {
            type: DataTypes.STRING,
            required: true,
            max: 9,
            allowNull: false
        }
    },
        {
            tableName: 'TELEFONE',
            timestamps: false
        }
    )
    return TelefoneModel
}
