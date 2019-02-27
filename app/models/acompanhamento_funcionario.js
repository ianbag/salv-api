module.exports = (sequelize, DataTypes) => {

    const acompanhamento_funcionarioModel = sequelize.define('Acompanhamento_funcionarioModel', {
    
        FUNCIONARIO_CODIGO:    {type: DataTypes.INTEGER},
        ACOMPANHAMENTO_CODIGO: {type: DataTypes.INTEGER}
    
    },
    
    {
        tableName:'ACOMPANHAMENTO_FUNCIONARIO'
    }
    
    )
    
    return acompanhamento_funcionarioModel
    
    }