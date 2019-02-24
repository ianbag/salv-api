module.exports = (sequelize, DataTypes) => {

    const acompanhamentosModel = sequelize.define('AcompanhamentosModel', {

        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        DATA_ACOMPANHAMENTO: {
            type: DataTypes.DATE,
            required: true
        },
        ATIVIDADE: {
            type: DataTypes.STRING,
            required: true,
            max: 1000
        }
    },
        {
            tableName: 'ACOMPANHAMENTO'
        }
    )

    return acompanhamentosModel

}