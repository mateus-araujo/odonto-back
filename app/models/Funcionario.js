'use strict';

module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define('Funcionario', {
    nome: DataTypes.STRING,
    clinica: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    data_nascimento: DataTypes.DATE,
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