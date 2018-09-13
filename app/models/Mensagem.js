'use strict'

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    assunto: DataTypes.STRING,
    remetenteId: DataTypes.INTEGER,
    texto: DataTypes.STRING
  }, {})

  Mensagem.associate = function(models) {
    Mensagem.belongsToMany(models.User, {
      through: 'MensagensDestinatarios',
      as: 'destinatarios',
      foreignKey: 'mensagemId'
    })

    Mensagem.hasOne(models.MensagemAnexo, { as: 'anexo', foreignKey: 'mensagemId' })
    Mensagem.hasOne(models.MensagemStatus, { as: 'status', foreignKey: 'mensagemId' })
  }

  return Mensagem
}
