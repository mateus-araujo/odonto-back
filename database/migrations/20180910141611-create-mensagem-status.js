'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('MensagensStatus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      vizualizada: {
        type: DataTypes.BOOLEAN
      },
      arquivada: {
        type: DataTypes.BOOLEAN
      },
      mensagemId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('MensagensStatus')
  }
}
