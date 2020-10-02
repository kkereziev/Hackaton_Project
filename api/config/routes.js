const { auth, timesheet, timesheetRow } = require('../routes');

module.exports = (app) => {
  app.use('/api/users', auth);
  app.use('/api/timesheets', timesheet);
  app.use('/api/timesheets', timesheetRow);
};
