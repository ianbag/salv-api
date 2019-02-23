module.exports = (sequelize, DataTypes) => {
    const ConvenioModel = sequelize.define('ConvenioModel', {
        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NOME_CONVENIO: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        },
        TIPO_CONVENIO: {
            type: DataTypes.STRING,
            required: true,
            max: 100,
            allowNull: false
        }
    }, 
    {
        tableName: 'CONVENIO',
        timestamps: false
    }
)
return ConvenioModel
}