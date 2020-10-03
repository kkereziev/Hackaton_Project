const createTimesheet = {
  startDate: '2020-09-21T09:32:31.116Z',
  name: '9-21-2020',
};

const createTimesheetForDeletion = {
  startDate: '2020-09-28T09:32:31.116Z',
  name: '9-28-2020',
};

const shouldntCreateTimesheet = {
  startDate: '2020-09-21T09:32:31.116Z',
};

module.exports = { createTimesheet, shouldntCreateTimesheet, createTimesheetForDeletion };
