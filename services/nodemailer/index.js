const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NM_EMAIL,
    pass: process.env.NM_PASSWORD
  }
})

transporter.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./services/nodemailer/mail'),
  extName: '.html',
}))

module.exports = transporter