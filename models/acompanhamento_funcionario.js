module.exports = (sequelize, DataTypes) => {

    const acompanhamento_funcionarioModel = sequelize.define('Acompanhamento_funcionarioModel', {
    
        funcionario_codigo:    {type: DataTypes.INTEGER, required: true, autoIncrement: true},
        acompanhamento_codigo: {type: DataTypes.INTEGER, required: true, autoIncrement: true}
    
    },
    
    {
        tableName:'ACOMPANHAMENTO_FUNCIONARIO'
    }
    
    )
    
    return acompanhamento_funcionarioModel
    
    }