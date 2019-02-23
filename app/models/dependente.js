/**
 * author: NathanBarsoti8
 */

 module.exports = (sequelize, DataTypes) => {
     const DependenteModel = sequelize.define('DependeteModel',
     {

        FUNCIONARIO_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allownull: false,
            references: 'FUNCIONARIO',
            referenceskey: 'CODIGO'
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
        }
     },
        {
            tableName: 'DEPENDENTE',
            timestamps: false
        }
     )
     return DependenteModel
 }