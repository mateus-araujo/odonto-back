const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ip = require('ip')
// const path = require('path');

const { Cargo, Funcionario, User } = require('./app/models')

const app = express()
const routes = require('./routes')

require('dotenv').config()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* const whitelist = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8080',
  'https://odonto-net.herokuapp.com/',
  'https://odonto-front.herokuapp.com/',
  'https://odonto-back.herokuapp.com/'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} */

app.use(cors())
app.use(routes)

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, '/public/build')));

createDefaultUser = async () => {
  if (!await User.findOne({ where: { email: 'admin@email.com' } })) {
    const user = await User.create({
      name: 'Administrador',
      email: 'admin@email.com',
      password: '123456'
    })

    const cargo = await Cargo.create({
      nome: 'Administrador',
      salario: '1000',
      descricao: 'Descrição de administrador',
      permissao: 'Administrador'
    })

    const funcionario = await Funcionario.create({
      clinica: 'Nome da clínica',
      cpf: '021.170-943-33',
      data_nascimento: '10/09/1993',
      excluido: false,
      acesso_sistema: true,
      usuarioId: user.id
    })

    const cargos = cargo.id
    funcionario.setCargos(cargos)
  }
}

createDefaultUser()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
}) */

app.listen(port, () => {
  console.log("Local address: http://localhost:" + port + "\n"
    + "Network address: http://" + ip.address() + ":" + port)
})

module.exports = app
