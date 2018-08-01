const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./routes')

require('dotenv').config()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.options('*', cors())
app.use(cors())

// require('./app/controllers/index')(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("Connected to port: " + port)
})

module.exports = app
