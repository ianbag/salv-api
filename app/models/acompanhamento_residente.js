module.exports = (sequelize, DataTypes) => {

const AcompanhamentoResidenteModel = sequelize.define('AcompanhamentoResidenteModel', {

    CODIGO_RESIDENTE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: 'RESIDENTE',
        referencesKey: 'CODIGO_RESIDENTE'
    },
    ACOMPANHAMENTO_CODIGO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: 'ACOMPANHAMENTO',
        referencesKey: 'CODIGO'
    }
},

{
    tableName:'ACOMPANHAMENTO_RESIDENTE',
    timestamps: false
}

)

return AcompanhamentoResidenteModel

}