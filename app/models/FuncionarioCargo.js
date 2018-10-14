'use strict'

module.exports = (sequelize, DataTypes) => {
  const FuncionarioCargo = sequelize.define('FuncionarioCargo', {
    funcionarioId: DataTypes.INTEGER,
    cargoId: DataTypes.INTEGER
  }, {
    tableName: 'FuncionariosCargos'
  })

  FuncionarioCargo.associate = function(models) {
    FuncionarioCargo.belongsTo(models.Funcionario, { foreignKey: 'funcionarioId' })
    FuncionarioCargo.belongsTo(models.Cargo, { foreignKey: 'cargoId' })
  }
  
  return FuncionarioCargo
}
