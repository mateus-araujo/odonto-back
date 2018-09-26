'use strict'

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    assunto: DataTypes.STRING,
    remetenteId: DataTypes.INTEGER,
    texto: DataTypes.STRING
  }, {
    tableName: 'Mensagens',
  })

  Mensagem.associate = function(models) {
    Mensagem.belongsToMany(models.User, {
      through: 'MensagensDestinatarios',
      as: 'destinatarios',
      foreignKey: 'mensagemId'
    })

    Mensagem.belongsTo(models.User, { as: 'remetente', foreignKey: 'remetenteId' })
    Mensagem.hasOne(models.MensagemAnexo, { as: 'anexo', foreignKey: 'mensagemId' })
    Mensagem.hasMany(models.MensagemStatus, { as: 'status', foreignKey: 'mensagemId' })
  }

  return Mensagem
}
