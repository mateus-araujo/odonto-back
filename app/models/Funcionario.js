'use strict';

const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define('Funcionario', {
    nome: DataTypes.STRING,
    clinica: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    data_nascimento: {
      type: DataTypes.DATEONLY,
      get: function () {
        return moment.utc(this.getDataValue('data_nascimento')).format('DD/MM/YYYY')
      }
    },
    acesso_sistema: DataTypes.BOOLEAN,
    usuarioId: DataTypes.INTEGER,
  }, {})

  Funcionario.associate = function (models) {
    Funcionario.belongsToMany(models.Cargo, {
      through: 'FuncionariosCargos',
      as: 'cargos',
      foreignKey: 'funcionarioId'
    })

    Funcionario.hasOne(models.User, { foreignKey: 'id' })
  }

  return Funcionario;
}