module.exports = (sequelize, DataTypes) => {

    const AcompanhamentoFuncionarioModel = sequelize.define('AcompanhamentoFuncionarioModel', {
    
        FUNCIONARIO_CODIGO:    {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: 'FUNCIONARIO',
            referencesKey: 'CODIGO_FUNCIONARIO'
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
        tableName:'ACOMPANHAMENTO_FUNCIONARIO',
        timestamps: false
    }
    
    )
    
    return AcompanhamentoFuncionarioModel
    
    }