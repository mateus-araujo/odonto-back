const { Funcionario, User, Cargo } = require('../models')

const create = async (req, res) => {
  try {
    const { email, password, cargos, ...data } = req.body

    const user = await User.create({ email, password })

    const funcionario = await Funcionario.create({ usuarioId: user.id, ...data })

    if (cargos && cargos.length > 0)
      funcionario.setCargos(cargos)

    return res.status(200).send({ funcionario, user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const index = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({
      include: [
        {
          model: Cargo,
          as: 'cargos',
          through: { atributes: [] },
        },
        User
      ]
    })

    return res.status(200).send({ funcionarios })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const show = async (req, res) => {
  try {
    const { funcionario_id } = req.params

    const funcionario = await Funcionario.findById(funcionario_id, {
      include: [
        {
          model: Cargo,
          as: 'cargos',
          through: { atributes: [] },
        },
        User
      ]
    })

    return res.send({ funcionario })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const update = async (req, res) => {
  const { funcionario_id } = req.params
  const { email, password, cargos, ...data } = req.body

  try {
    const funcionario = await Funcionario.findById(funcionario_id)
    const user = await User.findById(funcionario.usuarioId)

    funcionario.set(data)
    await funcionario.save()

    if (email || password) {
      user.set({ email, password })
      await user.save()
    }

    if (cargos && cargos.length > 0)
      funcionario.setCargos(cargos)

    return res.send({ funcionario, user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const destroy = async (req, res) => {
  const { funcionario_id } = req.params

  try {
    funcionario = await Funcionario.findById(funcionario_id)

    await funcionario.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar funcionário' })
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
}
