/* eslint-disable no-await-in-loop */
const { models, Op } = require('../db/index');
const { extractMondays, extractPertsOfDate, checkIfDateIsRight, lastDay } = require('../utils/index');
const { timesheetRowSchema } = require('../utils');

const get = {
  async allTimesheets(req, res, next) {
    const { id } = req.user.dataValues;

    const allTimesheetsForUser = await models.Timesheet.findAll({
      where: { userId: id },
    });

    res.json(allTimesheetsForUser);
  },

  async getTimesheetRows(req, res, next) {
    const { name } = req.params;

    const timesheetRows = await models.Timesheet.findOne({
      where: { name: { [Op.like]: `${name}%` } },
      include: [
        {
          model: models.TimesheetRow,
          as: 'TimesheetRow',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.json(timesheetRows);
  },

  async getProjects(req, res, next) {
    const { id } = req.user.dataValues;
    const projects = await models.User.findOne({
      attributes: [],
      include: [
        {
          model: models.Project,
          through: {
            attributes: [],
          },
          attributes: ['name', 'id'],
          as: 'UserProject',
          include: [
            {
              model: models.Task,
              attributes: ['name', 'id'],
              as: 'ProjectTask',
              through: {
                attributes: [],
              },
            },
          ],
          exclude: ['UsersProjects'],
        },
      ],
      where: { id },
    });

    res.json(projects);
  },

  async getDates(req, res, next) {
    const { id } = req.user.dataValues;
    const datesFinal = [];
    const dates = extractMondays();
    for (let i = 0; i < dates.length; i += 1) {
      const [finalEndDay, finalMonth, finalYear] = extractPertsOfDate(dates[i]);
      const dateString = `${finalMonth + 1}-${finalEndDay}-${finalYear}`;
      const findDate = await models.Timesheet.findOne({ where: { name: { [Op.like]: `${dateString}%` }, userId: id } });
      const doesExist = !!findDate;

      datesFinal[i] = { name: dateString, isSubmitted: doesExist, startDate: dates[i] };
    }

    res.json(datesFinal);
  },
};

const post = {
  async createTimesheet(req, res, next) {
    const { id } = req.user.dataValues;
    const { startDate, name } = req.body;
    const startingDate = new Date(startDate);
    if (!(startingDate instanceof Date)) {
      res.status(404).json({ error: 'Not a date' });
    }
    const partsOfTheSubbmitedDate = extractPertsOfDate(startingDate);
    const dates = extractMondays();
    const doesDayMatch = checkIfDateIsRight(partsOfTheSubbmitedDate, dates);

    if (doesDayMatch) {
      const finalDay = lastDay(startingDate);

      const [finalEndDay, finalMonth, finalYear] = extractPertsOfDate(finalDay);
      const timesheetName = `${name} to ${finalMonth + 1}-${finalEndDay}-${finalYear}`;
      const newTimesheet = await models.Timesheet.create({ name: timesheetName, startDate, isSubmitted: false, userId: id, totalHours: 0 }).catch(
        next
      );
      res.send(newTimesheet);
    } else {
      res.status(422).send({ error: 'Invalid starting date' });
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
        console.log('heeey');
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
            throw new Error('Invalid Project or Task', 400);
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

      await existsTimesheet.save();

      return res.send({ success: 'Rows created' });
    } catch (err) {
      console.log();

      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid ${err.details[0].path}` });
      }
      return res.status(400).send({ err: err.message });
    }
  },
};

const remove = {
  async deleteTimesheet(req, res, next) {
    try {
      const { timesheetId } = req.params;

      const existsTimesheet = await models.Timesheet.findOne({ where: { id: timesheetId } });
      if (!existsTimesheet) {
        throw Error('There is no timesheet with that id');
      }

      const existsTimesheetRows = await await models.TimesheetRow.findAll({ where: { timesheetId } });

      await models.Timesheet.destroy({
        where: { id: timesheetId },
      });

      if (existsTimesheetRows) {
        await models.TimesheetRow.destroy({
          where: { timesheetId },
        });
      }
      return res.send({ success: 'Timesheet deleted' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
};

module.exports = { get, post, patch, remove };
