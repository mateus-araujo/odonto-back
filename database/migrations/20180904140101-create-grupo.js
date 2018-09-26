'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Grupos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      titulo: {
        type: DataTypes.STRING
      },
      fundadorId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false
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
    return queryInterface.dropTable('Grupos');
  }
}