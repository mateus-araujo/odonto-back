'use strict'

module.exports = (sequelize, DataTypes) => {
  const TarefaStatus = sequelize.define('TarefaStatus', {
    entrada: DataTypes.BOOLEAN,
    enviada: DataTypes.BOOLEAN,
    arquivada: DataTypes.BOOLEAN,
    tarefaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  },
    { tableName: 'TarefasStatus' }
  )

  TarefaStatus.associate = function (models) {
    TarefaStatus.belongsTo(models.Tarefa, { as: 'tarefa', foreignKey: 'tarefaId' })
    TarefaStatus.belongsTo(models.User, { as: 'usuario', foreignKey: 'usuarioId' })
  }

  return TarefaStatus
}