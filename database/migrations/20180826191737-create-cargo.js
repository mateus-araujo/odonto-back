'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Cargos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nome: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          }
        }
      },
      salario: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" },
          isFloat: { msg: "Esse campo precisa ser um valor com vírgula" },
        }
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" }
        }
      },
      permissao: {
        type: DataTypes.ENUM(
          'Administrador', 
          'RH',
          'Gerente',
          'Usuário padrão'
          )
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    })
  },
  down: (queryInterface, DataTypes) => {
    queryInterface.dropTable('Cargos')
  }
}