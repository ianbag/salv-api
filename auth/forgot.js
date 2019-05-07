const sequelize = require('./../database/sequelize_remote')
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../app/models/usuario')(sequelize, DataTypes)
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const fs = require('fs')
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')

const email = 'drvidaredefinicao@gmail.com'
const senha = 'drvida2019'
const url = "https://drvida-api.herokuapp.com/#/esqueci-a-senha/"

const readtHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err
    } else {
      callback(null, html)
    }
  })
}

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: senha
  },
  tls: {
    rejectUnauthorized: false
  }
})

exports.forgot_password = function (req, res) {
  UsuarioModel.findOne({
    where: {
      EMAIL: req.body.EMAIL
    }
  }).then((user) => {
    if (!user) {
      res.status(422).json({ message: 'Este e-mail não está cadastrado' })
    } else {
      var token = crypto.randomBytes(20).toString('hex')
      UsuarioModel.update({
        RESET_PASSWORD_TOKEN: token,
        RESET_PASSWORD_EXPIRES: Date.now() + 8640000
      },
        {
          where: {
            EMAIL: user.EMAIL,
            STATUS: 1
          }
        }).then((updated) => {
          if (!updated) {
            res.status(442).json({ message: 'Tivemos um problema ao processar sua operação. Tente novamente mais tarde' })
          } else {
            readtHTMLFile('./../templates/forgot-password-email.html', function (err, html) {
              var template = handlebars.compile(html)
              var replacements = {
                url: url + token,
                name: user.LOGIN
              }
              var htmlToSend = template(replacements)
              var mailOptions = {
                to: user.EMAIL,
                from: email,
                html: htmlToSend,
                subject: 'Doutor Vida | Redefinição de Senha'
              }
              smtpTransport.sendMail(mailOptions, function (error, info) {
                if (error) {
                  res.status(442).json({ message: 'Serviço Indisponível' })
                } else {
                  res.status(200).json({ message: 'E-mail enviado com sucesso! Verifique sua caixa de entrada' })
                }
              })
            })
          }
        })
    }
  })
}

exports.reset_password = function (req, res, next) {
  UsuarioModel.findOne({
    where: {
      RESET_PASSWORD_TOKEN: req.params.token,
      // RESET_PASSWORD_EXPIRES: {
      //   $gt: Date.now()
      // }
    }
  }).then(async (user) => {
    if (!user) {
      res.status(422).json({ message: 'Ocorreu um erro' })
    } else {
      if (req.body.newPassword === req.body.verifyPassword) {
        JSON.stringify(req.body.newPassword)
        const salt = await bcrypt.genSaltSync(10)
        hashPass = await bcrypt.hash(req.body.newPassword, salt)
        UsuarioModel.update({
          SENHA: hashPass,
          RESET_PASSWORD_TOKEN: null,
          RESET_PASSWORD_EXPIRES: null
        },
          {
            where: {
              EMAIL: user.EMAIL,
              STATUS: 1
            }
          }).then((updated) => {
            readtHTMLFile(__dirname + '/templates/reset-password-email.html', function (err, html) {
              var template = handlebars.compile(html)
              var replacements = {
                name: user.LOGIN
              }
              var htmlToSend = template(replacements)
              var mailOptions = {
                to: user.EMAIL,
                from: email,
                html: htmlToSend,
                subject: 'Doutor Vida | Senha redefinida'
              }
              smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                  res.status(442).json({ message: 'Serviço Indisponível' })
                } else {
                  res.status(200).json({ message: 'Senha redefinida com sucesso.' })
                }
              })
            })
          }).catch((err) => {
            res.status(422).json({ message: 'Serviço Indisponível' + err })
          })
      }
    }
  })
}