'use strict'

module.exports = (sequelize, DataTypes) => {
  const Tarefa = sequelize.define('Tarefa', {
    assunto: DataTypes.STRING,
    texto: DataTypes.STRING,
    prazo: DataTypes.DATEONLY,
    remetenteId: DataTypes.INTEGER,
    destinatarioId: DataTypes.INTEGER
  }, {})

  Tarefa.associate = function(models) {
    // associations can be defined here
  }

  return Tarefa
}