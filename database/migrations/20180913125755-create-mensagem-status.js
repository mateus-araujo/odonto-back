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
      visualizada: {
        type: DataTypes.BOOLEAN
      },
      entrada: {
        type: DataTypes.BOOLEAN
      },
      enviada: {
        type: DataTypes.BOOLEAN
      },
      arquivada: {
        type: DataTypes.BOOLEAN
      },
      mensagemId: {
        type: DataTypes.INTEGER,
        references: { model: 'Mensagens', key: 'id' },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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