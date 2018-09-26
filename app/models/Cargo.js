'use strict'

module.exports = (sequelize, DataTypes) => {
  const Cargo = sequelize.define('Cargo', {
    nome: DataTypes.STRING,
    salario: DataTypes.FLOAT,
    descricao: DataTypes.STRING,
    permissao: DataTypes.ENUM(
      'Administrador', 
      'RH',
      'Gerente',
      'Padrão'
      )
  }, {})

  Cargo.associate = function(models) {
    Cargo.belongsToMany(models.Funcionario, {
      through: 'FuncionariosCargos',
      as: 'funcionarios',
      foreignKey: 'cargoId'
    })
  }
  
  return Cargo
}
