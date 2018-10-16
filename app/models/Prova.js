'use strict'

module.exports = (sequelize, DataTypes) => {
  const Prova = sequelize.define('Prova', {
    formulario: DataTypes.STRING,
    treinamentoId: DataTypes.INTEGER
  },
    { tableName: 'Provas' }
  )

  Prova.associate = function (models) {
    Prova.belongsTo(models.Treinamento, { as: 'treinamento', foreignKey: 'treinamentoId' })
    Prova.hasMany(models.Nota, { as: 'notas', foreignKey: 'provaId' })
  }

  return Prova
}
