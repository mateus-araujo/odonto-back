const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  })

  User.associate = function(models) {
    User.hasMany(models.Grupo, { foreignKey: 'fundadorId' })
    // User.hasMany(models.Mensagem, { foreignKey: 'remetenteId' })
    User.hasOne(models.Funcionario, { as: 'funcionario', foreignKey: 'usuarioId' })
    
    User.belongsToMany(models.Grupo, {
      through: 'GruposIntegrantes',
      as: 'grupos',
      foreignKey: 'integranteId'
    })

    User.belongsToMany(models.Mensagem, {
      through: 'MensagensDestinatarios',
      as: 'mensagens',
      foreignKey: 'destinatarioId'
    })
  }
  
  User.beforeSave(async (user) => {
    try {
      if (user.changed('password')) {
        const hash = await bcryptjs.hash(user.password, 10)
        user.password = hash
      }
    } catch (err) {
      console.log(err)
    }
  })

  return User
}
