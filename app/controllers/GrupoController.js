const { Grupo, User, Funcionario } = require('../models')

const create = async (req, res) => {
  try {
    const { integrantes, ...data } = req.body

    if (await Grupo.findOne({ where: { titulo: titulo } }))
      return res.status(400).send({ error: 'Um grupo com esse nome já existe' })

    const grupo = await Grupo.create({ ...data })
    const user = await User.findById(fundadorId)

    if (integrantes && integrantes.length > 0)
      grupo.setIntegrantes(integrantes)

    return res.status(200).send({ grupo, user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const index = async (req, res) => {
  try {
    const grupos = await Grupo.findAll({
      include: [
        {
          model: User,
          as: 'fundador'
        },
        {
          model: User,
          as: 'integrantes',
          include: [{
            model: Funcionario,
            as: 'funcionario'
          }]
        }
      ]
    })

    return res.status(200).send({ grupos })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const show = async (req, res) => {
  try {
    const { grupo_id } = req.params

    const grupo = await Grupo.findById(grupo_id, {
      include: [
        {
          model: User,
          as: 'fundador'
        },
        {
          model: User,
          as: 'integrantes',
          include: [{
            model: Funcionario,
            as: 'funcionario'
          }]
        }
      ]
    })

    return res.send({ grupo })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const update = async (req, res) => {
  const { grupo_id } = req.params
  let { integrantes, ...data } = req.body

  try {
    const grupo = await Grupo.findById(grupo_id)

    grupo.set({ ...data })
    await grupo.save()

    if (integrantes && integrantes.length > 0)
      grupo.setIntegrantes(integrantes)

    return res.send({ grupo })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const destroy = async (req, res) => {
  const { grupo_id } = req.params

  try {
    grupo = await Grupo.findById(grupo_id)

    await grupo.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar grupo' })
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
}
