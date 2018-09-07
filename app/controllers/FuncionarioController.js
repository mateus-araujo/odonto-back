const Sequelize = require('sequelize')
const Op = Sequelize.Op
const validator = require('validator')
const moment = require('moment')
const { Funcionario, User, Cargo } = require('../models')

const create = async (req, res) => {
  try {
    let { name, email, password, cargos, data_nascimento, ...data } = req.body

    if (await User.findOne({ where: { email: email } }))
      return res.status(400).send({ error: 'Usuário já existe' })

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'Email inválido' })
    }

    const user = await User.create({ name, email, password })

    data_nascimento = moment(data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY')

    const funcionario = await Funcionario.create({ usuarioId: user.id, data_nascimento, ...data })

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
        {
          model: User,
          as: 'usuario'
        }
      ]
    })

    return res.status(200).send({ funcionarios })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const search = async (req, res) => {
  const { toSearch } = req.params
  let funcionarios

  try {
    const funcionariosClinica = await Funcionario.findAll({ 
      where: { clinica: { [Op.like]: `%${toSearch}%` } },
      include: [
        {
          model: Cargo,
          as: 'cargos',
          through: { atributes: [] },
        },
        {
          model: User,
          as: 'usuario',
        }
      ]
    })

    const funcionariosCargo = await Funcionario.findAll({
      include: [
        {
          model: Cargo,
          as: 'cargos',
          where: { nome: { [Op.like]: `%${toSearch}%` } },
          through: { atributes: [] },
        },
        {
          model: User,
          as: 'usuario',
        }
      ]
    })

    const funcionariosUser = await Funcionario.findAll({
      include: [
        {
          model: Cargo,
          as: 'cargos',
          through: { atributes: [] },
        },
        {
          model: User,
          as: 'usuario',
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${toSearch}%` } },
              { email: { [Op.like]: `%${toSearch}%` } },
            ]
          }
        }
      ]
    })

    if (funcionariosClinica.length > 0)
      funcionarios = funcionariosClinica
    if (funcionariosCargo.length > 0)
      funcionarios = funcionariosCargo
    if (funcionariosUser.length > 0)
      funcionarios = funcionariosUser

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
        {
          model: User,
          as: 'usuario'
        }
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
  let { name, email, password, cargos, data_nascimento, ...data } = req.body

  try {
    const funcionario = await Funcionario.findById(funcionario_id)
    const user = await User.findById(funcionario.usuarioId)

    data_nascimento = moment(data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY')

    funcionario.set({ data_nascimento, ...data })
    await funcionario.save()

    if (name || email || password) {
      user.set({ name, email, password })
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
    user = await User.findById(funcionario.usuarioId)

    await funcionario.destroy()
    await user.destroy()

    return res.status(204).send()
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar funcionário' })
  }
}

module.exports = {
  create,
  index,
  search,
  show,
  update,
  destroy,
}
