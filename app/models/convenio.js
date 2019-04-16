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
        },
        STATUS: {
            type: DataTypes.TINYINT,
            max: 1,
            allowNull: false,
            defaultValue: 1,
        }
    }, 
    {
        tableName: 'CONVENIO',
        timestamps: false
    }
)
return ConvenioModel
}