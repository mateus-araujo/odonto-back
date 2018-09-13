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

    if (destinatarios && destinatarios.length > 0)
      mensagem.setDestinatarios(destinatarios)

    const mensagemStatus = await MensagemStatus.create({ vizualizada: false, arquivada: false, mensagemId: mensagem.id })

    return res.status(200).send({ mensagem, mensagemStatus })
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

const destroy = async (req, res) => {
  const { mensagem_id } = req.params

  try {
    mensagem = await Mensagem.findById(mensagem_id)

    await mensagem.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar mensgem' })
  }
}

module.exports = {
  create,
  index,
  destroy
}