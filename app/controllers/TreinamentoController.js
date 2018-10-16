const moment = require('moment')
const {
  Cargo,
  Funcionario,
  Treinamento,
  Prova,
  Nota,
  User
} = require('../models')

const create = async (req, res) => {
  try {
    let { titulo, url, prazo, remetenteId, destinatarios } = req.body
    
    let status = 'Não iniciado'
    prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY')

    const treinamento = await Treinamento.create({ titulo, url, prazo, status, remetenteId })

    if (destinatarios && destinatarios.length > 0)
      treinamento.setDestinatarios(destinatarios)

    return res.status(200).send({ treinamento })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const index = async (req, res) => {
  try {
    const treinamentos = await Treinamento.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: User,
          as: 'destinatarios',
        }
      ]
    })

    return res.status(200).send({ treinamentos })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

module.exports = {
  create,
  index
}
