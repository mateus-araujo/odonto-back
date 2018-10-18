const moment = require('moment')
const {
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
            as: 'notas',
            include: {
              model: User,
              as: 'usuario'
            }
          }]
        },
        {
          model: User,
          as: 'destinatarios',
          include: [{
            model: Funcionario,
            as: 'funcionario',
            where: { excluido: false },
          }]
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
          include: [
            {
              model: Nota,
              as: 'notas',
              include: {
                model: User,
                as: 'usuario'
              }
            },
          ]
        },
        {
          model: User,
          as: 'destinatarios',
          include: [
            {
              model: Funcionario,
              as: 'funcionario',
              where: { excluido: false },
            }
          ]
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

const update = async (req, res) => {
  const { treinamento_id } = req.params
  let { titulo, url, formulario, prazo, destinatarios } = req.body

  try {
    const treinamento = await Treinamento.findById(treinamento_id, {
      include: [{
        model: Prova,
        as: 'prova'
      }]
    })

    let prova = await Prova.findById(treinamento.prova.id)
    await prova.destroy()
    prova = await Prova.create({ formulario, treinamentoId: treinamento.id })

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

    prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY')

    treinamento.set({ titulo, url, prazo })
    await treinamento.save()

    prova.set({ formulario })
    await prova.save()

    return res.send({ treinamento })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao editar treinamento' })
  }
}

const setNotas = async (req, res) => {
  const { treinamento_id } = req.params
  const { notas } = req.body

  try {
    const treinamento = await Treinamento.findById(treinamento_id, {
      include: [{
        model: Prova,
        as: 'prova'
      }]
    })

    const { id, formulario } = treinamento.prova

    let prova = await Prova.findById(id)
    await prova.destroy()
    prova = await Prova.create({ formulario, treinamentoId: treinamento.id })

    await notas.map(item =>
      Nota.create({
        nota: item.nota,
        provaId: prova.id,
        usuarioId: item.usuarioId
      })
    )

    treinamento.set({ status: 'Encerrado' })
    await treinamento.save()

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
  update,
  setNotas,
  showTrainingsUser,
  destroy
}
