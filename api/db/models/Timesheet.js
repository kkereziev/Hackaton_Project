const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Timesheet extends Model {}

  Timesheet.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: 'Timesheets', modelName: 'Timesheet' }
  );
  return Timesheet;
};
