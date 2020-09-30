const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TimesheetRow extends Model {}
  TimesheetRow.init(
    {
      monday: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tuesday: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wednesday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 24,
        },
      },
      thursday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 24,
        },
      },
      friday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 24,
        },
      },
      saturday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 24,
        },
      },
      sunday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 24,
        },
      },
      totalRowHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'TimesheetRows', modelName: 'TimesheetRow' }
  );
  return TimesheetRow;
};
