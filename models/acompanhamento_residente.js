module.exports = (sequelize, DataTypes) => {

const acompanhamento_residenteModel = sequelize.define('Acompanhamento_residenteModel', {

    residente_codigo:      {type: DataTypes.INTEGER, required: true, autoIncrement: true},
    acompanhamento_codigo: {type: DataTypes.INTEGER, required: true, autoIncrement: true}

},

{
    tableName:'ACOMPANHAMENTO_RESIDENTE'
}

)

return acompanhamento_residenteModel

}