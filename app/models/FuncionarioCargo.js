'use strict'

module.exports = (sequelize, DataTypes) => {
  const FuncionarioCargo = sequelize.define('FuncionarioCargo', {
    funcionario_id: DataTypes.INTEGER,
    cargo_id: DataTypes.INTEGER
  }, {})

  FuncionarioCargo.associate = function(models) {
    FuncionarioCargo.belongsTo(models.Funcionario, { foreignKey: 'funcionario_id' })
    FuncionarioCargo.belongsTo(models.Cargo, { foreignKey: 'cargo_id' })
  }
  return FuncionarioCargo
}
