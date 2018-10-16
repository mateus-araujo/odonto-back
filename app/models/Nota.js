'use strict'

module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define('Nota', {
    nota: DataTypes.FLOAT,
    provaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER
  },
    { tableName: 'Notas' }
  )

  Nota.associate = function (models) {
    Nota.belongsTo(models.Prova, { as: 'prova', foreignKey: 'provaId' })
    Nota.belongsTo(models.User, { as: 'usuario', foreignKey: 'usuarioId' })
  }

  return Nota
}
