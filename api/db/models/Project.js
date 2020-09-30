const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {}

  Project.init(
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
      modelName: 'Project',
      tableName: 'Projects',
    }
  );

  return Project;
};
