'use strict';
module.exports = (sequelize, DataTypes) => {
  const GrupoIntegrante = sequelize.define('GrupoIntegrante', {
    grupoId: DataTypes.INTEGER,
    integranteId: DataTypes.INTEGER
  }, {
    tableName: 'GruposIntegrantes'
  })

  GrupoIntegrante.associate = function(models) {
    GrupoIntegrante.belongsTo(models.Grupo, { foreignKey: 'grupoId' })
    GrupoIntegrante.belongsTo(models.User, { foreignKey: 'integranteId' })
  }

  return GrupoIntegrante
}