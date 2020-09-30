module.exports = (sequelize) => {
  const { User, Task, Project, Timesheet, TimesheetRow } = sequelize.models;

  User.hasMany(Timesheet, { foreignKey: 'userId', as: 'Timesheets' });
  Timesheet.belongsTo(User, { foreignKey: 'userId', as: 'User' });

  Timesheet.hasMany(TimesheetRow, { foreignKey: 'timesheetId', as: 'TimesheetRow' });
  TimesheetRow.belongsTo(Timesheet, { foreignKey: 'timesheetId', as: 'Timesheet' });

  Project.hasMany(TimesheetRow, { foreignKey: 'projectId', as: 'TimesheetRow' });
  TimesheetRow.belongsTo(Project, { foreignKey: 'projectId', as: 'Project' });

  Task.hasMany(TimesheetRow, { foreignKey: 'taskId', as: 'TimesheetRow' });
  TimesheetRow.belongsTo(Task, { foreignKey: 'taskId', as: 'Task' });

  Task.belongsToMany(Project, {
    through: 'ProjectsTasks',
    foreignKey: 'taskId',
    as: 'TaskProject',
  });
  Project.belongsToMany(Task, {
    through: 'ProjectsTasks',
    foreignKey: 'projectId',
    as: 'ProjectTask',
  });

  User.belongsToMany(Project, {
    through: 'UsersProjects',
    foreignKey: 'userId',
    as: 'UserProject',
  });
  Project.belongsToMany(User, {
    through: 'UsersProjects',
    foreignKey: 'projectId',
    as: 'ProjectUser',
  });
};
