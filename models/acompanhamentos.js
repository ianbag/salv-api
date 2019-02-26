module.exports = (sequelize, DataTypes) => {

const acompanhamentosModel = sequelize.define('AcompanhamentosModel', {

    codigo: {type: DataTypes.INTEGER, required: true, autoIncrement: true},    
    data_acompanhamento:   {type: DataTypes.DATE, required: true},
    atividade:             {type: DataTypes.String, required: true, max: 1000} 



 },

 {
 tableName: 'ACOMPANHAMENTO'
 }


 ) 

 return acompanhamentosModel

}