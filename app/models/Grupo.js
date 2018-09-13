'use strict'

module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    titulo: DataTypes.STRING,
    fundadorId: DataTypes.INTEGER
  }, {})
  
  Grupo.associate = function(models) {
    Grupo.belongsToMany(models.User, {
      through: 'GruposIntegrantes',
      as: 'integrantes',
      foreignKey: 'grupoId'
    })

    Grupo.belongsTo(models.User, { as: 'fundador', foreignKey: 'fundadorId' })
  }
  return Grupo
}