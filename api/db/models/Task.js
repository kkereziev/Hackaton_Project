const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {}

  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          min: 4,
          max: 40,
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'Tasks',
    }
  );

  return Task;
};
