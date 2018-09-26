'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemStatus = sequelize.define('MensagemStatus', {
    visualizada: DataTypes.BOOLEAN,
    arquivada: DataTypes.BOOLEAN,
    apagada: DataTypes.BOOLEAN,
    mensagemId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  }, {
    tableName: 'MensagensStatus',
  })

  MensagemStatus.associate = function(models) {
    MensagemStatus.belongsTo(models.Mensagem, { as: 'mensagem', foreignKey: 'mensagemId' })
    MensagemStatus.belongsTo(models.User, { as: 'usuario', foreignKey: 'usuarioId' })
  }

  return MensagemStatus
}