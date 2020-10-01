const date = require('date.js');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { models, Op } = require('../db/index');
const { extractMondays, extractPertsOfDate, checkIfDateIsRight, lastDay } = require('../utils/index');
const { secret } = require('../config/config');
const { timesheetRowSchema } = require('../utils');

const get = {
  async allTimesheets(req, res, next) {
    console.log(req.user.dataValues.id);
  },

  async timesheetRows(req, res, next) {},

  async getDates(req, res, next) {
    const datesFinal = [];
    const dates = extractMondays();
    for (let i = 0; i < dates.length; i++) {
      const [finalEndDay, finalMonth, finalYear] = extractPertsOfDate(dates[i]);
      const dateString = `${finalMonth + 1}-${finalEndDay}-${finalYear}`;
      const findDate = await models.Timesheet.findOne({ where: { name: { [Op.like]: `${dateString}%` } } });
      const doesExist = !!findDate;

      datesFinal[i] = { name: dateString, isSubmitted: doesExist, startDate: dates[i] };
    }

    res.json(datesFinal);
  },
};

const post = {
  // TODO
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
      const { id } = req.user.dataValues;
      const { rows, timesheetId, isSubmitted } = req.body;

      let timesheetTotalHours = 0;
      const existTimesheet = await models.Timesheet.findOne({ where: { id: timesheetId } });

      if (!existTimesheet) throw Error('There is no timesheet with that id');

      await models.TimesheetRow.destroy({
        where: { timesheetId },
        truncate: true,
      });

      const totalHours = rows.map(async (row) => {
        const result = await timesheetRowSchema.validateAsync(row);
        const { projectId, taskId, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = result;
        const totalRowHours = monday + tuesday + wednesday + thursday + friday + saturday + sunday;
        timesheetTotalHours += totalRowHours;

        const doesProjectAndTask = await models.ProjectsTasks.findOne({ where: { projectId, taskId } }).catch(next);
        if (!doesProjectAndTask || doesProjectAndTask.taskId !== taskId) {
          throw Error('Invalid Project or Task');
        }
        const createRow = await models.TimesheetRow.create({
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

        return timesheetTotalHours;
      });
      console.log(totalHours);
      existTimesheet.totalHours = totalHours;
      existTimesheet.isSubmitted = !!isSubmitted;
      console.log(existTimesheet.totalHours);
      await existTimesheet.save();

      return res.send({ success: 'Rows created' });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid ${err.details[0].path}` });
      }
      return res.status(400).send({ error: err });
    }
  },
};

const remove = {
  async deleteTimesheet(req, res, next) {
    console.log('deleteTimesheet');
  },
};

module.exports = { get, post, patch, remove };
