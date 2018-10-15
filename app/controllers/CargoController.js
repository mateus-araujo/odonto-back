const { Cargo, Funcionario } = require('../models')

const create = async (req, res) => {
  const { nome, descricao, salario, permissao } = req.body

  try {
    if (await Cargo.findOne({ where: { nome: nome } }))
      return res.status(400).send({ error: 'Cargo já existe' })

    const cargo = await Cargo.create({ nome, descricao, salario, permissao })

    return res.status(200).send({ cargo })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao criar cargo' })
  }
}

const index = async (req, res) => {
  try {
    const cargos = await Cargo.findAll()

    return res.status(200).send({ cargos })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const show = async (req, res) => {
  const { cargo_id } = req.params

  try {
    const cargo = await Cargo.findById(cargo_id)

    return res.send({ cargo })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
}

const update = async (req, res) => {
  const { cargo_id } = req.params
  const data = req.body

  try {
    cargo = await Cargo.findById(cargo_id)

    cargo.set(data)
    await cargo.save()

    return res.send({ cargo })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao atualizar cargo' })
  }
}

const destroy = async (req, res) => {
  const { cargo_id } = req.params

  try {
    cargo = await Cargo.findById(cargo_id)

    const funcionarios = await Funcionario.findAll({
      where: { excluido: false },
      include: [
        {
          model: Cargo,
          as: 'cargos',
          where: { id: cargo_id },
          through: { atributes: [] },
        }
      ]
    })

    if (funcionarios.length)
      return res.status(400).send({ error: 'Não foi possível excluir, existem funcionários vinculados a este cargo' })
    else {
      await cargo.destroy()

      return res.status(204).send()
    }


  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro ao deletar cargo' })
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
}
