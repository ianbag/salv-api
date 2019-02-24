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
            allowNull: false
        },
        TELEFONE_CODIGO: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            tableName: 'TELEFONE_PESSOA',
            timestamps: false
        }
    )
    return TelefonePessoaModel
}
