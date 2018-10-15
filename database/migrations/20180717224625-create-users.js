'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" }
        }
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" },
          isEmail: { msg: "Esse precisa ser um email" }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" }
        }
      },
      passwordResetToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      passwordResetExpires: {
        allowNull: true,
        type: DataTypes.DATE,
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

  down: (queryInterface) => {
    queryInterface.dropTable('Users')
  }
}
