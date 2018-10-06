'use strict'

const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Tarefa = sequelize.define('Tarefa', {
    assunto: DataTypes.STRING,
    texto: DataTypes.STRING,
    prazo: {
      type: DataTypes.DATEONLY,
      get: function () {
        return moment.utc(this.getDataValue('prazo')).format('DD/MM/YYYY')
      }
    },
    visualizada: DataTypes.BOOLEAN,
    status: {
      type: DataTypes.ENUM(
        'waiting',
        'doing',
        'verifying',
        'completed',
        'not_completed',
        'cancelled'
      ),
    },
    motivo: DataTypes.STRING,
    remetenteId: DataTypes.INTEGER,
    destinatarioId: DataTypes.INTEGER
  }, {})

  Tarefa.associate = function (models) {
    Tarefa.belongsTo(models.User, { as: 'remetente', foreignKey: 'remetenteId' })
    Tarefa.belongsTo(models.User, { as: 'destinatario', foreignKey: 'destinatarioId' })
    Tarefa.hasMany(models.TarefaStatus, { as: 'statusUser', foreignKey: 'tarefaId' })
  }

  return Tarefa
}