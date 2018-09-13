'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemStatus = sequelize.define('MensagemStatus', {
    vizualizada: DataTypes.BOOLEAN,
    arquivada: DataTypes.BOOLEAN,
    mensagemId: DataTypes.INTEGER
  }, {})

  MensagemStatus.associate = function(models) {
    MensagemStatus.belongsTo(models.Mensagem, { as: 'mensagem', foreignKey: 'mensagemId' })
  }

  return MensagemStatus
}