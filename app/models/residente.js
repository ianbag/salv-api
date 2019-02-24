/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:25:46
 * @modify date 2019-02-17 19:51:13
 * @desc Arquivo de model da API de Residente
 */
const { PessoaModel } = require('./../models')

module.exports = (sequelize, DataTypes) => {
    const ResidenteModel = sequelize.define('ResidenteModel', {
        CODIGO_RESIDENTE: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        APELIDO: {
            type: DataTypes.STRING,
            max: 50
        },
        PROFISSAO: {
            type: DataTypes.STRING,
            max: 100
        },
        TITULO_ELEITOR: {
            type: DataTypes.STRING,
            max: 12
        },
        ZONA_ELEITORAL: {
            type: DataTypes.STRING,
            max: 3
        },
        SECAO_ELEITORAL: {
            type: DataTypes.STRING,
            max: 3,
        },
        NUMERO_CERTIDAO_NASCIMENTO: {
            type: DataTypes.STRING,
            max: 5,
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
        CARTAO_SAMS: {
            type: DataTypes.STRING,
            max: 16
        },
        CARTAO_SUS: {
            type: DataTypes.STRING,
            max: 50
        },
        NUMERO_INSS: {
            type: DataTypes.STRING,
            max: 11
        },
        BANCO_INSS: {
            type: DataTypes.STRING,
            max: 50
        },
        AGENCIA_INSS: {
            type: DataTypes.STRING,
            max: 50
        },
        CONTA_INSS: {
            type: DataTypes.STRING,
            max: 50
        },
        VALOR_INSS: {
            type: DataTypes.DOUBLE,
        },
        SITUACAO_INSS: {
            type: DataTypes.STRING,
            max: 3
        },
        PROVA_VIDA_INSS: {
            type: DataTypes.DATEONLY
        },
        DATA_ACOLHIMENTO: {
            type: DataTypes.DATEONLY,
            required: true,
            allowNull: false
        },
        DATA_DESACOLHIMENTO: {
            type: DataTypes.DATEONLY
        },
        MOTIVO_DESACOLHIMENTO: {
            type: DataTypes.STRING,
            max: 500
        },
        PESSOA_CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        }
    },
        {
            tableName: 'RESIDENTE',
            timestamps: false,
        }
    )
    //@TODO - Criar as associations de Residente x Pessoa (1:M)
    
    return ResidenteModel
}