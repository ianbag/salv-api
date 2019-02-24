module.exports = (sequelize, DataTypes) => {
    const EnderecoConvenioModel = sequelize.define('EnderecoConvenioModel', {
        CONVENIO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'CONVENIO',
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
            tableName: 'ENDERECO_CONVENIO',
            timestamps: false
        }
    )
    return EnderecoConvenioModel
}