/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:32:03
 * @modify date 2019-02-17 12:01:34
 * @desc Pessoa Model
 */

module.exports = (sequelize, DataTypes) => {
    const PessoaModel = sequelize.define('PessoaModel', {
        CODIGO: {
            type: DataTypes.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        NOME: {
            type: DataTypes.STRING,
            required: true,
            max: 50
        },
        SOBRENOME: {
            type: DataTypes.STRING,
            required: true,
            max: 50
        },
        RG: {
            type: DataTypes.STRING,
            unique: true,
            max: 9
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
            type: DataTypes.DATE,
            max: 8
        },
        RELIGIAO: {
            type: DataTypes.STRING,
            max: 3
        },
        ESCOLARIDADE: {
            type: DataTypes.STRING,
            max:2
        }
    },
        {
            tableName: 'PESSOA',
            timestamps: false
        }
    )
    return PessoaModel
}