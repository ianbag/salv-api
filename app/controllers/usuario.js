/**
 * author: NathanBarsoti8
 */

 const { UsuarioModel } = require('./../models')

 class Usuario {
     
    getById(req, res){
        UsuarioModel.findByPk(req.params.id)
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    create(req, res){
        UsuarioModel.create(req.body)
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    update(req, res){
        UsuarioModel.destroy({
            where: {
                USUARIO: req.params.id
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }

    delete(req, res){
        UsuarioModel.destroy({
            where: {
                USUARIO: req.params.id
            }
        })
            .then(usuario => res.json(usuario))
            .catch(error => res.json(error))
    }   

 }

 module.exports = new Usuario()