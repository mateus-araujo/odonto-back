'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      clinica: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" }
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" },
          is: {
            args: ["/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/"],
            msg: "Este campo precisa ser um cpf válido"
          },
        }
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Esse campo não pode ser vazio" },
          isDate: { msg: "Esse campo precisa ser uma data válida" }
        }
      },
      excluido: {
        type: DataTypes.BOOLEAN
      },
      acesso_sistema: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('Funcionarios');
  }
};