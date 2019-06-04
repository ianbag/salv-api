/**
 * author: NathanBarsoti
 */

module.exports = (sequelize, DataTypes) => {
    const TelefoneParentescoModel = sequelize.define('TelefoneParentescoModel', {
        NUMERO_CONVENIO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'RESIDENTE_CONVENIO',
            referencesKey: 'NUMERO_CONVENIO'
        },
        TELEFONE_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'TELEFONE',
            referencesKey: 'CODIGO'
        }
    },
        {
            tableName: 'TELEFONE_PARENTESCO',
            timestamps: false
        }
    )
    return TelefoneParentescoModel
}