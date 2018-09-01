'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('FuncionariosCargos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      funcionarioId: {
        type: DataTypes.INTEGER,
        references: { model: 'Funcionarios', key: 'id' },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      cargoId: {
        type: DataTypes.INTEGER,
        references: { model: 'Cargos', key: 'id' },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('FuncionariosCargos');
  }
};