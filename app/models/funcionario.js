/**
 * author: NathanBarsoti8
 */

module.exports = (sequelize, DataTypes) => {
    const FuncionarioModel = sequelize.define('FuncionarioModel', {
        
        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NOME: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        SOBRENOME: {
            type: DataTypes.STRING,
            required: true,
            max: 50,
            allowNull: false
        },
        RG: {
            type: DataTypes.STRING,
            unique: true,
            max: 9,
        },
        CPF: {
            type: DataTypes.STRING,
            unique: true,
            max: 11
        },
        SEXO: {
            type: DataTypes.STRING,
            max: 1
        },
        ESTADO_CIVIL: {
            type: DataTypes.STRING,
            max: 1
        },
        DATA_NASCIMENTO: {
            type: DataTypes.DATEONLY,
            max: 8
        },
        RELIGIAO: {
            type: DataTypes.STRING,
            max: 3
        },
        ESCOLARIDADE: {
            type: DataTypes.STRING,
            max:2
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
        }
    },
        {
            tableName: 'FUNCIONARIO',
            timestamps: false
        }    
    )
    return FuncionarioModel
}