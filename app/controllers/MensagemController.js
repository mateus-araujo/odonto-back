const {
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
      arquivada: false,
      apagada: false,
      mensagemId: mensagem.id,
      usuarioId: remetenteId
    })

    if (destinatarios && destinatarios.length > 0) {
      mensagem.setDestinatarios(destinatarios)

      destinatarios.map(usuarioId =>
        MensagemStatus.create({
          visualizada: false,
          arquivada: false,
          apagada: false,
          mensagemId: mensagem.id,
          usuarioId
        })
      )
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
            arquivada: false,
            apagada: false,
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
            apagada: false
          }
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
            arquivada: true,
            apagada: false,
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

    status.set({ arquivada: true })
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

    status.set({ arquivada: false })
    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const deleteMessage = async (req, res) => {
  const { mensagem_id, user_id } = req.params

  try {
    const status = await MensagemStatus.findOne({ 
      where: { 
        mensagemId: mensagem_id, 
        usuarioId: user_id
      }
    })

    status.set({ apagada: true })
    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar mensgem' })
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
  deleteMessage
}
