'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('GruposIntegrantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      grupoId: {
        type: DataTypes.INTEGER,
        references: { model: 'Grupos', key: 'id' },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      integranteId: {
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
    return queryInterface.dropTable('GruposIntegrantes');
  }
}