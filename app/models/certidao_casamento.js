/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-05-22 00:29:18
 * @modify date 2019-05-22 00:29:18
 * @desc Arquivo de model da API de Certidão de Casamento
 */

module.exports = (sequelize, DataTypes) => {
    const CertidaoCasamentoModel = sequelize.define('CertidaoCasamentoModel', {
        CODIGO_RESIDENTE: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: 'RESIDENTE',
            referencesKey: 'CODIGO_RESIDENTE'
        },
        FOLHA: {
            type: DataTypes.STRING,
            max: 5
        },
        LIVRO: {
            type: DataTypes.STRING,
            max: 5
        },
        REGISTRO: {
            type: DataTypes.STRING,
            max: 10
        },
        CIDADE: {
            type: DataTypes.STRING,
            max: 100
        },
        ESTADO: {
            type: DataTypes.STRING,
            max: 2
        },
        CONJUGE: {
            type: DataTypes.STRING,
            max: 200
        },
    },
        {
            tableName: 'CERTIDAO_CASAMENTO',
            timestamps: false
        }
    )

    return CertidaoCasamentoModel
}
