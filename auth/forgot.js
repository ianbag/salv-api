const sequelize = require('./../database/sequelize_remote')
const DataTypes = sequelize.DataTypes
const UsuarioModel = require('./../app/models/usuario')(sequelize, DataTypes)
const crypto = require('crypto')
const fs = require('fs')
const handlebars = require('handlebars')
const nodemailer = require('nodemailer')

const email = 'drvidaredefinicao@gmail.com'
const senha = 'drvida2019'
const url = "http://localhost:3000/esqueci-a-senha?token="

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
      EMAIL: req.body.email
    }
  }).then((user) => {
    if (!user) {
      res.status(422).json({ message: 'Este e-mail não está cadastrado' })
    } else {
      var token = crypto.randomBytes(20).toString('hex')
      UsuarioModel.update({
        RESET_PASSWORD_TOKEN: token,
        RESET_PASSWORD_EXPIRES: Date.now() + 86400000
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
            readtHTMLFile(__dirname + './../templates/forgot-password-email.html', function (err, html) {
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