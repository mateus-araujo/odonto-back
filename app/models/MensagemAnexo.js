'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemAnexo = sequelize.define('MensagemAnexo', {
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    anexo: DataTypes.BLOB
  }, {})

  MensagemAnexo.associate = function(models) {
    // associations can be defined here
  }

  return MensagemAnexo
}