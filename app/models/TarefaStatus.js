'use strict'

module.exports = (sequelize, DataTypes) => {
  const TarefaStatus = sequelize.define('TarefaStatus', {
    visualizada: DataTypes.BOOLEAN,
    entrada: DataTypes.BOOLEAN,
    enviada: DataTypes.BOOLEAN,
    arquivada: DataTypes.BOOLEAN,
    tarefaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {})

  TarefaStatus.associate = function(models) {
    // associations can be defined here
  }

  return TarefaStatus
}