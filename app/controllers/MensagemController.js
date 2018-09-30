const {
  Cargo,
  Funcionario,
  Mensagem,
  // MensagemAnexo,
  MensagemStatus,
  User
} = require('../models')

const create = async (req, res) => {
  try {
    const { assunto, remetenteId, texto, destinatarios } = req.body

    const mensagem = await Mensagem.create({ assunto, remetenteId, texto })

    /* if (anexoId)
      const mensagemAnexo = await MensagemAnexo({ nome, tipo, anexo, mensagemId: mensagem.id }) */

    await MensagemStatus.create({
      visualizada: false,
      entrada: false,
      enviada: true,
      arquivada: false,
      mensagemId: mensagem.id,
      usuarioId: remetenteId
    })

    if (destinatarios && destinatarios.length > 0) {
      mensagem.setDestinatarios(destinatarios)

      destinatarios.map(usuarioId => {
        if (usuarioId != mensagem.remetenteId)
          MensagemStatus.create({
            visualizada: false,
            entrada: true,
            enviada: false,
            arquivada: false,
            mensagemId: mensagem.id,
            usuarioId
          })
      })
    }

    return res.status(200).send({ mensagem })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const index = async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: MensagemStatus,
          as: 'status'
        },
        {
          model: User,
          as: 'destinatarios',
          through: { atributes: [] },
        }
      ]
    })

    return res.status(200).send({ mensagens })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const show = async (req, res) => {
  const { mensagem_id } = req.params

  try {
    const mensagens = await Mensagem.findById(mensagem_id, {
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: MensagemStatus,
          as: 'status'
        },
        {
          model: User,
          as: 'destinatarios',
          through: { atributes: [] },
        }
      ]
    })

    return res.status(200).send({ mensagens })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const showMessagesInbox = async (req, res) => {
  const { user_id } = req.params

  try {
    const mensagens = await Mensagem.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: MensagemStatus,
          as: 'status',
          where: {
            entrada: true,
            enviada: false,
            arquivada: false,
            usuarioId: user_id
          }
        },
        {
          model: User,
          as: 'destinatarios',
          through: { atributes: [] },
          where: { id: user_id }
        }
      ]
    })

    return res.status(200).send({ mensagens })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const showMessagesSent = async (req, res) => {
  const { user_id } = req.params

  try {
    const mensagens = await Mensagem.findAll({
      include: [
        {
          model: User,
          as: 'remetente',
          where: { id: user_id }
        },
        {
          model: MensagemStatus,
          as: 'status',
          where: {
            arquivada: false,
          },
          include: [{
            model: User,
            as: 'usuario',
            attributes: ['name'],
            include: [{
              model: Funcionario,
              as: 'funcionario',
              attributes: ['id'],
              include: [{
                model: Cargo,
                as: 'cargos',
                attributes: ['nome'],
              }]
            }]
          }]
        },
        {
          model: User,
          as: 'destinatarios',
          through: { atributes: [] },
        }
      ]
    })

    return res.status(200).send({ mensagens })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const showMessagesArchived = async (req, res) => {
  const { user_id } = req.params

  try {
    const mensagens = await Mensagem.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: MensagemStatus,
          as: 'status',
          where: {
            entrada: false,
            enviada: false,
            arquivada: true,
            usuarioId: user_id
          }
        },
        {
          model: User,
          as: 'destinatarios',
          through: { atributes: [] }
        }
      ]
    })

    return res.status(200).send({ mensagens })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const viewMessage = async (req, res) => {
  const { mensagem_id, user_id } = req.params

  try {
    const status = await MensagemStatus.findOne({
      where: {
        mensagemId: mensagem_id,
        usuarioId: user_id
      }
    })

    status.set({ visualizada: true })
    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const archiveMessage = async (req, res) => {
  const { mensagem_id, user_id } = req.params

  try {
    const status = await MensagemStatus.findOne({
      where: {
        mensagemId: mensagem_id,
        usuarioId: user_id
      }
    })

    const mensagem = await Mensagem.findById(mensagem_id)

    if (user_id == mensagem.remetenteId)
      status.set({ enviada: false, arquivada: true })
    else
      status.set({ entrada: false, arquivada: true })

    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const restoreMessage = async (req, res) => {
  const { mensagem_id, user_id } = req.params

  try {
    const status = await MensagemStatus.findOne({
      where: {
        mensagemId: mensagem_id,
        usuarioId: user_id
      }
    })

    const mensagem = await Mensagem.findById(mensagem_id)

    if (user_id == mensagem.remetenteId)
      status.set({ enviada: true, arquivada: false })
    else
      status.set({ entrada: true, arquivada: false })

    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const deleteMessage = async (req, res) => {
  const { mensagem_id, user_id, local_id } = req.params

  try {
    const status = await MensagemStatus.findOne({
      where: {
        mensagemId: mensagem_id,
        usuarioId: user_id
      }
    })

    if (local_id == 1)
      status.set({ entrada: false })
    else if (local_id == 2)
      status.set({ enviada: false })
    else if (local_id == 3)
      status.set({ arquivada: false })

    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar mensgem' })
  }
}

const destroy = async (req, res) => {
  const { mensagem_id } = req.params

  try {
    mensagem = await Mensagem.findById(mensagem_id)

    await mensagem.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar mensagem' })
  }
}

module.exports = {
  create,
  index,
  show,
  showMessagesInbox,
  showMessagesSent,
  showMessagesArchived,
  viewMessage,
  archiveMessage,
  restoreMessage,
  deleteMessage,
  destroy
}
