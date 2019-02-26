/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-20 19:42:40
 * @modify date 2019-02-20 19:42:40
 * @desc Arquivo model da API de TELEFONE_PESSOA
 */

module.exports = (sequelize, DataTypes) => {
    const TelefonePessoaModel = sequelize.define('TelefonePessoaModel', {
        PESSOA_CODIGO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: 'PESSOA',
            referencesKey: 'CODIGO'
        },
        TELEFONE_CODIGO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: 'TELEFONE',
            referencesKey: 'CODIGO'
        }
    },
        {
            tableName: 'TELEFONE_PESSOA',
            timestamps: false
        }
    )
    return TelefonePessoaModel
}
