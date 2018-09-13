'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemDestinatario = sequelize.define('MensagemDestinatario', {
    mensagemId: DataTypes.INTEGER,
    destinatarioId: DataTypes.INTEGER
  }, {})

  MensagemDestinatario.associate = function(models) {
    MensagemDestinatario.belongsTo(models.Mensagem, { foreignKey: 'mensagemId' })
    MensagemDestinatario.belongsTo(models.User, { foreignKey: 'destinatarioId' })
  }

  return MensagemDestinatario
}