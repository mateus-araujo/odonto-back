const moment = require('moment')
const { Tarefa, TarefaStatus, User } = require('../models')

const create = async (req, res) => {
  try {
    let { assunto, texto, prazo, remetenteId, destinatarioId } = req.body

    let status = 'waiting'
    prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY')

    const tarefa = await Tarefa.create({
      assunto, texto, prazo, visualizada: false, status,
      remetenteId, destinatarioId
    })

    await TarefaStatus.create({
      entrada: false,
      enviada: true,
      arquivada: false,
      tarefaId: tarefa.id,
      usuarioId: remetenteId
    })

    await TarefaStatus.create({
      entrada: true,
      enviada: false,
      arquivada: false,
      tarefaId: tarefa.id,
      usuarioId: destinatarioId
    })

    return res.status(200).send({ tarefa })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const index = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: TarefaStatus,
          as: 'statusUser'
        },
        {
          model: User,
          as: 'destinatario'
        }
      ]
    })

    return res.status(200).send({ tarefas })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const show = async (req, res) => {
  const { tarefa_id } = req.params

  try {
    const tarefa = await Tarefa.findById(tarefa_id, {
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: TarefaStatus,
          as: 'statusUser'
        },
        {
          model: User,
          as: 'destinatario'
        }
      ]
    })

    return res.status(200).send({ tarefa })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const changeStatus = async (req, res) => {
  const { tarefa_id } = req.params
  const { status, motivo } = req.body

  try {
    const tarefa = await Tarefa.findById(tarefa_id)

    if (motivo.length > 0 || motivo !== undefined)
      tarefa.set({ status, motivo })
    else
      tarefa.set({ status })

    await tarefa.save()

    return res.send({ tarefa })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao alterar status da tarefa' })
  }
}

const showTasksInbox = async (req, res) => {
  const { user_id } = req.params

  try {
    const tarefas = await Tarefa.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: TarefaStatus,
          as: 'statusUser',
          where: {
            entrada: true,
            enviada: false,
            arquivada: false,
            usuarioId: user_id
          }
        },
        {
          model: User,
          as: 'destinatario',
          where: { id: user_id }
        }
      ]
    })

    return res.status(200).send({ tarefas })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const showTasksSent = async (req, res) => {
  const { user_id } = req.params

  try {
    const tarefas = await Tarefa.findAll({
      include: [
        {
          model: User,
          as: 'remetente',
          where: { id: user_id }
        },
        {
          model: TarefaStatus,
          as: 'statusUser',
          where: {
            entrada: false,
            enviada: true,
            arquivada: false,
            usuarioId: user_id
          }
        },
        {
          model: User,
          as: 'destinatario',
        }
      ]
    })

    return res.status(200).send({ tarefas })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const showTasksArchived = async (req, res) => {
  const { user_id } = req.params

  try {
    const tarefas = await Tarefa.findAll({
      include: [
        {
          model: User,
          as: 'remetente'
        },
        {
          model: TarefaStatus,
          as: 'statusUser',
          where: {
            entrada: false,
            enviada: false,
            arquivada: true,
            usuarioId: user_id
          }
        },
        {
          model: User,
          as: 'destinatario',
        }
      ]
    })

    return res.status(200).send({ tarefas })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const viewTask = async (req, res) => {
  const { tarefa_id, user_id } = req.params

  try {
    const tarefa = await Tarefa.findById(tarefa_id)

    if (Number(user_id) === tarefa.destinatarioId) {
      tarefa.set({ visualizada: true })
      await tarefa.save()
    }

    return res.send({ tarefa })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const archiveTask = async (req, res) => {
  const { tarefa_id, user_id } = req.params

  try {
    const tarefa = await Tarefa.findById(tarefa_id)

    if (tarefa.status === 'waiting')
      return res.status(400).send({ error: 'Não é possível arquivar uma tarefa em espera' })
    else if (tarefa.status === 'doing')
      return res.status(400).send({ error: 'Não é possível arquivar uma tarefa em execução' })
    else if (tarefa.status === 'verifying')
      return res.status(400).send({ error: 'Não é possível arquivar uma tarefa em verificação' })

    const status = await TarefaStatus.findOne({
      where: {
        tarefaId: tarefa_id,
        usuarioId: user_id
      }
    })

    if (status.usuarioId === tarefa.remetenteId)
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

const restoreTask = async (req, res) => {
  const { tarefa_id, user_id } = req.params

  try {
    const tarefa = await Tarefa.findById(tarefa_id)

    const status = await TarefaStatus.findOne({
      where: {
        tarefaId: tarefa_id,
        usuarioId: user_id
      }
    })

    if (status.usuarioId === tarefa.remetenteId)
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

const deleteTask = async (req, res) => {
  const { tarefa_id, user_id, local_id } = req.params

  try {
    const tarefa = await Tarefa.findById(tarefa_id)

    if (tarefa.status === 'waiting')
      return res.status(400).send({ error: 'Não é possível excluir uma tarefa em espera' })
    else if (tarefa.status === 'doing')
      return res.status(400).send({ error: 'Não é possível excluir uma tarefa em execução' })
    else if (tarefa.status === 'verifying')
      return res.status(400).send({ error: 'Não é possível excluir uma tarefa em verificação' })

    const status = await TarefaStatus.findOne({
      where: {
        tarefaId: tarefa_id,
        usuarioId: user_id
      }
    })

    if (local_id === '1')
      status.set({ entrada: false })
    else if (local_id === '2')
      status.set({ enviada: false })
    else if (local_id == '3')
      status.set({ arquivada: false })

    await status.save()

    return res.send({ status })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao excluir tarefa' })
  }
}

const destroy = async (req, res) => {
  const { tarefa_id } = req.params

  try {
    tarefa = await Tarefa.findById(tarefa_id)

    await tarefa.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar tarefa' })
  }
}

module.exports = {
  create,
  index,
  show,
  changeStatus,
  showTasksInbox,
  showTasksSent,
  showTasksArchived,
  viewTask,
  archiveTask,
  restoreTask,
  deleteTask,
  destroy
}