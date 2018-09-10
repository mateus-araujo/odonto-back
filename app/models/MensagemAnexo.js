'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemAnexo = sequelize.define('MensagemAnexo', {
    anexo: DataTypes.BLOB,
    tipo: DataTypes.STRING,
    mensagemId: DataTypes.INTEGER
  }, {})

  MensagemAnexo.associate = function(models) {
    // associations can be defined here
  }

  return MensagemAnexo
}
