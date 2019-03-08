/**
 * author: NathanBarsoti8
 */

 const { UsuarioModel } = require('./../models')

 class Usuario {
     
    getById(req, res){
        UsuarioModel.findOne({
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    create(req, res){
        UsuarioModel.create(req.body)
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    update(req, res){
        UsuarioModel.update(req.body, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    delete(req, res){
        UsuarioModel.update({STATUS: 1}, {
            where: {
                CODIGO_FUNCIONARIO: req.params.id,
                STATUS: 0
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }   

 }

 module.exports = new Usuario()