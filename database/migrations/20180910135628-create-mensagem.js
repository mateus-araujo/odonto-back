'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Mensagens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      assunto: {
        type: DataTypes.STRING
      },
      remetente: {
        type: DataTypes.INTEGER
      },
      texto: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER
      },
      anexo: {
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
    return queryInterface.dropTable('Mensagens')
  }
}
