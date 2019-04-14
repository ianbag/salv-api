const sequelize = require('./../database/sequelize_remote')
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../app/models/usuario')(sequelize, DataTypes)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const async = require('async')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const email = process.env.MAILER_EMAIL_ID || 'drvida.redefinicao@gmail.com'
const pass = process.env.MAILER_PASSWORD || 'drvida_redefinicao_2019'
const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
})

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
}

smtpTransport.use('compile', hbs(handlebarsOptions))

exports.forgot_password = function (req, res) {
    async.waterfall([
        function (done) {
            UsuarioModel.findOne({
                email: req.body.email
            }).then(function (err, user) {
                if (user) {
                    done(err, user)
                } else {
                    done('Usuário não encontrado')
                }
            })
        },
        function (user, done) {
            crypto.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex')
                done(err, user, token)
            })
        },
        function (user, token, done) {
            UsuarioModel.findByIdAndUpdate({
                CODIGO_FUNCIONARIO: user.CODIGO_FUNCIONARIO
            },
                {
                    reset_password_token: token,
                    reset_password_expires: Date.now() + 86400000
                },
                {
                    upsert: true,
                    new: true
                }).exec(function (err, new_user) {
                    done(err, token, new_user)
                })
        },
        function (token, user, done) {
            var data = {
                to: user.EMAIL,
                from: email,
                template: 'forgot-password-email',
                subject: 'Redefinição de senha chegou',
                context: {
                    url: 'http://localhost:3000/esqueci-a-senha?token=' + token,
                    name: user.USUARIO[0]
                }
            }
            smtpTransport.sendMail(data, function (err) {
                if (!err) {
                    return res.json({ message: 'Cheque sua caixa de e-mails para prosseguir com a redefinição da senha' })
                } else {
                    return done(err)
                }
            })
        }
    ], function (err) {
        return res.status(422).json({ message: err })
    })
}
