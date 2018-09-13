'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemAnexo = sequelize.define('MensagemAnexo', {
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    anexo: DataTypes.BLOB,
    mensagemId: DataTypes.INTEGER,
  }, {})

  MensagemAnexo.associate = function(models) {
    MensagemAnexo.belongsTo(models.Mensagem, { as: 'mensagem', foreignKey: 'mensagemId' })
  }

  return MensagemAnexo
}