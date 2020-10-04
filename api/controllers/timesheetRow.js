const { models, Op } = require('../db/index');
const { timesheetRowSchema } = require('../utils');

const get = {
  async getTimesheetRows(req, res, next) {
    try {
      const { name } = req.params;
      const { id } = req.user.dataValues;

      const timesheetRows = await models.Timesheet.findOne({
        where: { name: { [Op.like]: `${name}%` }, userId: id },
        include: [
          {
            model: models.TimesheetRow,
            as: 'TimesheetRow',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }).catch(next);

      res.send({ result: timesheetRows });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};

const patch = {
  async createTimesheetRow(req, res, next) {
    try {
      const { rows, isSubmitted } = req.body;
      const { timesheetId } = req.params;

      const existsTimesheet = await models.Timesheet.findOne({ where: { id: timesheetId } }).catch(next);
      if (!existsTimesheet) {
        throw new Error('There is no timesheet with that id');
      }

      await models.TimesheetRow.destroy({
        where: { timesheetId },
      }).catch(next);

      const sumTimesheetHours = await Promise.all(
        rows.map(async (row) => {
          const result = await timesheetRowSchema.validateAsync(row);
          const { projectId, taskId, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = result;
          const totalRowHours = monday + tuesday + wednesday + thursday + friday + saturday + sunday;

          const doesProjectAndTask = await models.ProjectsTasks.findOne({ where: { projectId, taskId } }).catch(next);
          if (!doesProjectAndTask || doesProjectAndTask.taskId !== taskId) {
            throw new Error('Invalid Project or Task');
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

          return totalRowHours;
        })
      ).catch(next);

      const summedHours = sumTimesheetHours.reduce((a, b) => a + b);
      existsTimesheet.totalHours = summedHours;
      existsTimesheet.isSubmitted = !!isSubmitted;

      await existsTimesheet.save().catch(next);

      return res.send({ success: 'Rows created' });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid ${err.details[0].path}` });
      }
      return res.status(400).send({ err: err.message });
    }
  },
};

module.exports = { get, patch };
