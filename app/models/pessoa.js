/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 11:32:03
 * @modify date 2019-02-17 17:09:22
 * @desc Pessoa Model
 */

module.exports = (sequelize, DataTypes) => {
    const PessoaModel = sequelize.define('PessoaModel', {
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
        STATUS: {
            type: DataTypes.TINYINT,
            max: 1,
            allowNull: false,
            defaultValue: 0,
        }
    },
        {
            tableName: 'PESSOA',
            timestamps: false
        }
    )
    return PessoaModel
}