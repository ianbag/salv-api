/**
 * author: NathanBarsoti8
 */

 module.exports = (sequelize, DataTypes) => {
     const DependenteModel = sequelize.define('DependenteModel',
     {
        CODIGO_FUNCIONARIO: {
            type: DataTypes.INTEGER,
            required: true,
            allownull: false,
            primaryKey: true,
            references: 'FUNCIONARIO',
            referenceskey: 'CODIGO_FUNCIONARIO'
        },
        NOME: {
            type: DataTypes.STRING,
            required: true,
            primaryKey: true,
            max: 100,
            allownull: false
        },
        SOBRENOME: {
            type: DataTypes.STRING,
            required: true,
            primaryKey: true,
            max: 100,
            allownull: false
        },
        DATA_NASCIMENTO: {
            type: DataTypes.DATEONLY,
            required: true,
            max: 8,
            allownull: false
        },
        RG: {
            type: DataTypes.STRING,
            max: 8
        },
        CPF: { 
            type: DataTypes.STRING,
            max: 11
        },
        NUMERO_CERTIDAO_NASCIMENTO: { 
            type: DataTypes.STRING,
            max: 5
        },
        FOLHA_CERTIDAO_NASCIMENTO: { 
            type: DataTypes.STRING,
            max: 5
        },
        LIVRO_CERTIDAO_NASCIMENTO: { 
            type: DataTypes.STRING,
            max: 3
        },
        CIDADE_CERTIDAO_NASCIMENTO: { 
            type: DataTypes.STRING,
            max: 50
        },
        ESTADO_CERTIDAO_NASCIMENTO: { 
            type: DataTypes.STRING,
            max: 2
        },
        STATUS: {
            type: DataTypes.TINYINT,
            max: 1,
            allowNull: false,
            defaultValue: 1,
        }
     },
        {
            tableName: 'DEPENDENTE',
            timestamps: false
        }
     )
     return DependenteModel
 }