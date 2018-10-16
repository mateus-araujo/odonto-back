'use strict'

module.exports = (sequelize, DataTypes) => {
  const TreinamentoDestinatario = sequelize.define('TreinamentoDestinatario', {
    treinamentoId: DataTypes.INTEGER,
    destinatarioId: DataTypes.INTEGER
  },
    { tableName: 'TreinamentosDestinatarios' }
  )

  TreinamentoDestinatario.associate = function (models) {
    TreinamentoDestinatario.belongsTo(models.Treinamento, { foreignKey: 'treinamentoId' })
    TreinamentoDestinatario.belongsTo(models.User, { foreignKey: 'destinatarioId' })
  }

  return TreinamentoDestinatario
}
