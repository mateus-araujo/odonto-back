'use strict'

const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Treinamento = sequelize.define('Treinamento', {
    titulo: DataTypes.STRING,
    url: DataTypes.STRING,
    prazo: {
      type: DataTypes.DATEONLY,
      get: function () {
        return moment.utc(this.getDataValue('prazo')).format('DD/MM/YYYY')
      }
    },
    status: {
      type: DataTypes.ENUM(
        'Não iniciado',
        'Executando',
        'Aguardando notas',
        'Encerrado'
      )
    },
    remetenteId: DataTypes.INTEGER
  }, {})

  Treinamento.associate = function(models) {
    Treinamento.belongsToMany(models.User, {
      through: 'TreinamentosDestinatarios',
      as: 'destinatarios',
      foreignKey: 'treinamentoId'
    })

    Treinamento.belongsTo(models.User, { as: 'remetente', foreignKey: 'remetenteId' })
    Treinamento.hasOne(models.Prova, { as: 'prova', foreignKey: 'treinamentoId' })
  }

  return Treinamento
}
