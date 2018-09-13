'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemDestinatario = sequelize.define('MensagemDestinatario', {
    mensagemId: DataTypes.INTEGER,
    destinatarioId: DataTypes.INTEGER
  }, {})

  MensagemDestinatario.associate = function(models) {
    // associations can be defined here
  }
  return MensagemDestinatario
}