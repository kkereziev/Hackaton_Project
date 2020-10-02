const { models, Op } = require('../db/index');
const { extractMondays, extractPertsOfDate, checkIfDateIsRight, lastDay } = require('../utils/index');
const { timesheetRowSchema } = require('../utils');

const get = {};
const post = {};

const patch = {
  async createTimesheetRow(req, res, next) {
    try {
      const { rows, isSubmitted } = req.body;
      const { timesheetId } = req.params;

      let timesheetTotalHours = 0;
      const existsTimesheet = await models.Timesheet.findOne({ where: { id: timesheetId } });

      if (!existsTimesheet) throw Error('There is no timesheet with that id');

      await models.TimesheetRow.destroy({
        where: { timesheetId },
      });

      const ty = rows.reduce(async (a, b) => {
        const result = await timesheetRowSchema.validateAsync(rows[i]);
        const { projectId, taskId, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = result;
        const totalRowHours = monday + tuesday + wednesday + thursday + friday + saturday + sunday;
        timesheetTotalHours += totalRowHours;

        const doesProjectAndTask = await models.ProjectsTasks.findOne({ where: { projectId, taskId } }).catch(next);
        if (!doesProjectAndTask || doesProjectAndTask.taskId !== taskId) {
          throw Error('Invalid Project or Task');
        }

        await models.TimesheetRow.create({
          projectId,
          taskId,
          timesheetId,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
          totalRowHours,
        }).catch(next);
        return a + totalRowHours;
      }, 0);

      existsTimesheet.totalHours = timesheetTotalHours;
      existsTimesheet.isSubmitted = !!isSubmitted;

      await existsTimesheet.save();

      return res.send({ success: 'Rows created' });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid ${err.details[0].path}` });
      }
      return res.status(400).send({ error: err });
    }
  },
};
module.exports = { get, post };
