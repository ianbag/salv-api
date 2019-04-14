const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com'
const pass = process.env.MAILER_PASSWORD || 'auth_email_pass'
const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
})

var handlebarsOptions= {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./templates/'),
    extName: '.html'
}

smtpTransport.use('compile', hbs(handlebarsOptions))

