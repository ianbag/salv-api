/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-19 11:46:12
 * @modify date 2019-02-19 11:58:53
 * @desc Arquivo de model da API de Beneficio
 */

 module.exports = (sequelize, DataTypes) => {
     const BeneficioModel = sequelize.define('BeneficioModel', {
         NOME_BENEFICIO: {
             type: DataTypes.STRING,
             primaryKey: true,
             allowNull: false,
             max: 100
         },
         CODIGO_RESIDENTE: {
             type: DataTypes.INTEGER,
         },
         BANCO_BENEFICIO: {
             type: DataTypes.STRING,
             max: 50
         },
         AGENCIA_BENEFICIO: {
             type: DataTypes.STRING,
             max: 50
         },
         CONTA_BENEFICIO: {
            type: DataTypes.STRING,
            max: 50
         },
         VALOR_BENEFICIO: {
             type: DataTypes.DOUBLE
         },
         PROVA_VIDA_BENEFICIO: {
             type: DataTypes.DATEONLY,
             allowNull: false
         }
     },
     {
        tableName: 'BENEFICIO',
        timestamps: false
     }
     )
     
     return BeneficioModel
 }
