const { auth, timesheet } = require('../routes');

module.exports = (app) => {
  app.use('/api/users', auth);
  //app.use('/api/timesheets', timesheet);
};
