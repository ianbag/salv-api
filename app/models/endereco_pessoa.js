/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-24 13:55:10
 * @modify date 2019-02-24 13:59:42
 * @desc Arquivo Model da API de Endereco Pessoa
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('EnderecoPessoaModel', {
        PESSOA_CODIGO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: 'PESSOA',
            referencesKey: 'CODIGO'
        },
        ENDERECO_CODIGO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: 'ENDERECO',
            referencesKey: 'CODIGO'
        }
    },
        {
            tableName: 'ENDERECO_PESSOA',
            timestamps: false
        }
    )
}