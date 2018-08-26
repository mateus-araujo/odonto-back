'use strict'

module.exports = (sequelize, DataTypes) => {
  const Cargo = sequelize.define('Cargo', {
    nome: DataTypes.STRING,
    salario: DataTypes.FLOAT,
    descricao: DataTypes.STRING
  }, {})
  Cargo.associate = function(models) {
    // associations can be defined here
  };
  return Cargo
};