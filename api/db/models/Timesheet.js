const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Timesheet extends Model {}
  Timesheet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      isSubmitted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      totalHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'Timesheets', modelName: 'Timesheet' }
  );
  return Timesheet;
};
