/**
 * @author Ian Rotondo Bagliotti
 * @email ian.bagliotti@gmail.com
 * @create date 2019-02-17 19:27:38
 * @modify date 2019-03-10 19:31:02
 * @desc Residente Controller
 */

const Sequelize = require('sequelize')
let sequelize = new Sequelize('salv-bd', 'admin-dev', 'salv2018gpes10', {
    host: "mysql995.umbler.com",
    port: "41890",
    dialect: "mysql"
})

const { ResidenteModel, PessoaModel } = require('./../models')

ResidenteModel.belongsTo(PessoaModel, {as: 'PESSOA', foreignKey: 'PESSOA_CODIGO'})

class Residente {
    get(req, res) {
        ResidenteModel.findAll({
            where: { STATUS: 0 },
            include: [{model: PessoaModel, as: 'PESSOA'}],

        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    getById(req, res) {
        ResidenteModel.findOne({
            where: {
                CODIGO_RESIDENTE: req.params.id,
                STATUS: 0,
            },
            include: [{model: PessoaModel, as: 'PESSOA'}],
        })
            .then(residente => res.json(residente))
            .catch(error => res.json(erro))
    }
    create(req, res) {
        ResidenteModel.create(req.body)
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    update(req, res) {
        ResidenteModel.update(req.body, {
             where: {
                  CODIGO_RESIDENTE: req.params.id,
                  STATUS: 0
            } 
        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    delete(req, res) {
        ResidenteModel.update({STATUS: 1}, {
             where: {
                  CODIGO_RESIDENTE: req.params.id,
                  STATUS: 0
            } 
        })
            .then(residente => res.json(residente))
            .catch(error => res.json(error))
    }
    aniversariante(req, res){
        sequelize.query(`SELECT
                            P.NOME, P.SOBRENOME, P.DATA_NASCIMENTO
                        FROM
                            RESIDENTE R
                            LEFT JOIN PESSOA P
                            ON P.CODIGO = R.PESSOA_CODIGO
                            WHERE MONTH(P.DATA_NASCIMENTO) = :mes`,
        { replacements: { mes: (new Date().getMonth()+1)} })
        .then(result => {
        res.json(result[0])
        })
    }
}

module.exports = new Residente()