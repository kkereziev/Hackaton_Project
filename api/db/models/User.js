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
          min: 4,
          max: 20,
        },
      },
      phash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          max: 20,
        },
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
