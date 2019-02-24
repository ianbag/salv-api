module.exports = (sequelize, DataTypes) => {

const acompanhamento_residenteModel = sequelize.define('Acompanhamento_residenteModel', {

    residente_codigo:      {type: DataTypes.INTEGER},
    acompanhamento_codigo: {type: DataTypes.INTEGER}

},

{
    tableName:'ACOMPANHAMENTO_RESIDENTE'
}

)

return acompanhamento_residenteModel

}