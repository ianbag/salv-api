module.exports = (sequelize, DataTypes) => {

    const acompanhamentosModel = sequelize.define('AcompanhamentosModel', {

        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        DATA_ACOMPANHAMENTO: 
        {
            
            type: DataTypes.DATEONLY,
            required: true
        },
        ATIVIDADE: {
            type: DataTypes.STRING,
            required: true,
            max: 1000
        }
    },
        {
            tableName: 'ACOMPANHAMENTO',
            timestamps: false,
        }
    )

    return acompanhamentosModel

}