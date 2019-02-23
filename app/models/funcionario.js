/**
 * author: NathanBarsoti8
 */

module.exports = (sequelize, DataTypes) => {
    const FuncionarioModel = sequelize.define('FuncionarioModel', {
        
        CODIGO_FUNCIONARIO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        FILHOS_MENOS_14: {
            type: DataTypes.STRING,
            required: true,
            max: 1,
            allowNull: false
        },
        CARGO: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        DATA_ADMISSAO: {
            type: DataTypes.DATEONLY,
            required: true,
            max: 8,
            allowNull: false
        },
        DATA_DEMISSAO: {
            type: DataTypes.DATEONLY,
            max: 8
        },
        PESSOA_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false,
            references: 'PESSOA',
            referenceskey: 'CODIGO'
        }
    },
        {
            tableName: 'FUNCIONARIO',
            timestamps: false
        }    
    )
    return FuncionarioModel
}