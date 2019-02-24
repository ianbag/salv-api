module.exports = (sequelize, DataTypes) => {
    const ResidenteConvenioModel = sequelize.define('ResidenteConvenioModel', {
        NUMERO_CONVENIO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        CODIGO_RESIDENTE: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            primaryKey: true,
            references: 'RESIDENTE',
            referencesKey: 'CODIGO_RESIDENTE'
        },
        TITULAR_CONVENIO: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        PARENTESCO_CONVENIO: {
            type: DataTypes.STRING,
            max: 100
        },
        CONVENIO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        }
    },
        {
            tableName: 'RESIDENTE_CONVENIO',
            timestamps: false
        }
    )
    return ResidenteConvenioModel
}