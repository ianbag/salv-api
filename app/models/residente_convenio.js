module.exports = (sequelize, DataTypes) => {
    const ResidenteConvenioModel = sequelize.define('ResidenteConvenioModel', {
        NUMERO_CONVENIO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            allowNull: false,
        },
        RESIDENTE_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
        },
        TITULAR_CONVENIO: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        PARENTESCO_TITULAR: {
            type: DataTypes.STRING,
            max: 100
        },
        CONVENIO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: 'CONVENIO',
            referencesKey: 'CODIGO'
        },
        STATUS: {
            type: DataTypes.TINYINT,
            max: 1,
            allowNull: false,
            defaultValue: 0,
        }
    },
        {
            tableName: 'RESIDENTE_CONVENIO',
            timestamps: false
        }
    )
    return ResidenteConvenioModel
}