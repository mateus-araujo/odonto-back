const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  })
  
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
