'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('TarefasStatus', {
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
      tarefaId: {
        type: DataTypes.INTEGER,
        references: { model: 'Tarefas', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
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
    return queryInterface.dropTable('TarefasStatus');
  }
}
