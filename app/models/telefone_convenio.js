module.exports = (sequelize, DataTypes) => {
    const TelefoneConvenioModel = sequelize.define('TelefoneConvenioModel', {
        CONVENIO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'CONVENIO',
            referencesKey: 'CODIGO'
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
            tableName: 'TELEFONE_CONVENIO',
            timestamps: false
        }
    )
    return TelefoneConvenioModel
}