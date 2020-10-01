const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async matchPassword(password) {
      return bcrypt.compare(password, this.phash);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^(?!.*\.(?:com|net))[A-Z0-9.]{5,}$/i,
        },
      },
      phash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  User.afterValidate((user) => {
    user.phash = bcrypt.hashSync(user.phash, 12);
  });
  return User;
};
