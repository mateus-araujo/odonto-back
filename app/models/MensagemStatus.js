'use strict'

module.exports = (sequelize, DataTypes) => {
  const MensagemStatus = sequelize.define('MensagemStatus', {
    vizualizada: DataTypes.BOOLEAN,
    arquivada: DataTypes.BOOLEAN
  }, {})

  MensagemStatus.associate = function(models) {
    // associations can be defined here
  }

  return MensagemStatus
}