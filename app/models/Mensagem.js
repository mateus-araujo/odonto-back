'use strict'

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    assunto: DataTypes.STRING,
    remetente: DataTypes.INTEGER,
    texto: DataTypes.STRING,
    status: DataTypes.INTEGER,
    anexo: DataTypes.INTEGER
  }, {})

  Mensagem.associate = function(models) {
    // associations can be defined here
  }

  return Mensagem
}
