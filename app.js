const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ip = require('ip')
const path = require('path');

const { Cargo, Funcionario, User } = require('./app/models')

const app = express()
const routes = require('./routes')

require('dotenv').config()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.options('*', cors())
app.use(cors())

app.use(function (req, res, next) {
  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma')

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
  } else {
    next()
  }
})


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/public/build')));

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

// require('./app/controllers/index')(app)

// app.get('/', (req, res) => {
//  res.send('Hello World!')
// })

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
})

app.listen(port, () => {
  console.log("Local address: http://localhost:" + port + "\n"
    + "Network address: http://" + ip.address() + ":" + port)

})

module.exports = app
