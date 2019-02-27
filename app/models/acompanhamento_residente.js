module.exports = (sequelize, DataTypes) => {

const acompanhamento_residenteModel = sequelize.define('Acompanhamento_residenteModel', {

    RESIDENTE_CODIGO:      {type: DataTypes.INTEGER},
    ACOMPANHAMENTO_CODIGO: {type: DataTypes.INTEGER}

},

{
    tableName:'ACOMPANHAMENTO_RESIDENTE'
}

)

return acompanhamento_residenteModel

}