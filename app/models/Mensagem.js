'use strict'

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    assunto: DataTypes.STRING,
    remetenteId: DataTypes.INTEGER,
    texto: DataTypes.STRING,
    statusId: DataTypes.INTEGER,
    anexoId: DataTypes.INTEGER
  }, {})

  Mensagem.associate = function(models) {
    // associations can be defined here
  }

  return Mensagem
}
