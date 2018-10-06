'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Tarefas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      assunto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      texto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prazo: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      visualizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(
          'waiting',
          'doing',
          'verifying',
          'completed',
          'not_completed',
          'cancelled'
        ),
        allowNull: false
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      remetenteId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      destinatarioId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
    return queryInterface.dropTable('Tarefas')
  }
}
