module.exports = (sequelize, DataTypes) => {

    const acompanhamento_funcionarioModel = sequelize.define('Acompanhamento_funcionarioModel', {
    
        funcionario_codigo:    {type: DataTypes.INTEGER},
        acompanhamento_codigo: {type: DataTypes.INTEGER}
    
    },
    
    {
        tableName:'ACOMPANHAMENTO_FUNCIONARIO'
    }
    
    )
    
    return acompanhamento_funcionarioModel
    
    }