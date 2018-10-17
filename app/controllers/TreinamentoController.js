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
    let { titulo, url, formulario, prazo, remetenteId, destinatarios } = req.body

    let status = 'Não iniciado'
    url = url.replace('watch?v=', 'embed/')

    prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY')

    const treinamento = await Treinamento.create({ titulo, url, prazo, status, remetenteId })

    const prova = await Prova.create({ formulario, treinamentoId: treinamento.id })

    if (destinatarios && destinatarios.length > 0) {
      treinamento.setDestinatarios(destinatarios)

      destinatarios.map(usuarioId => 
        Nota.create({ 
          nota: 0,
          provaId: prova.id,
          usuarioId
        })
      )
    }

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
          model: Prova,
          as: 'prova',
          include: [{
            model: Nota,
            as: 'notas'
          }]
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

const show = async (req, res) => {
  const { treinamento_id } = req.params

  try {
    const treinamento = await Treinamento.findById(treinamento_id, {
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: Prova,
          as: 'prova',
          include: [{
            model: Nota,
            as: 'notas'
          }]
        },
        {
          model: User,
          as: 'destinatarios',
        }
      ]
    })

    return res.status(200).send({ treinamento })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const changeStatus = async (req, res) => {
  const { treinamento_id } = req.params
  const { status } = req.body

  try {
    const treinamento = await Treinamento.findById(treinamento_id)

    treinamento.set({ status })
    await treinamento.save()

    return res.send({ treinamento })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao alterar status do treinamento' })
  }
}

const setNotas = async (req, res) => {
  const { prova_id } = req.params
  const { notas } = req.body

  try {
    await notas.map(nota => 
      Nota.create({
        nota: nota.valor,
        provaId: prova_id,
        usuarioId: nota.usuarioId
      })
    )

    return res.send({ notas })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao alterar notas da prova' })
  }
}

const showTrainingsUser = async (req, res) => {
  const { user_id } = req.params

  try {
    const treinamentos = await Treinamento.findAll({
      include: [
        {
          model: Prova,
          as: 'prova',
          include: [{
            model: Nota,
            as: 'notas',
            where: { usuarioId: user_id }
          }]
        },
        {
          model: User,
          as: 'destinatarios',
          where: { id: user_id }
        }
      ]
    })

    return res.status(200).send({ treinamentos })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const destroy = async (req, res) => {
  const { treinamento_id } = req.params

  try {
    treinamento = await Treinamento.findById(treinamento_id)

    await treinamento.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar treinamento' })
  }
}

module.exports = {
  create,
  index,
  show,
  changeStatus,
  setNotas,
  showTrainingsUser,
  destroy
}
