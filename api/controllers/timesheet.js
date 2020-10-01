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
  async updateTimesheet(req, res, next) {
    console.log('updateTimesheet');
  },
  async createTimesheetRow(req, res, next) {
    try {
      const { id } = req.user.dataValues;
      const { rows } = req.body;
      let timesheetTotalHours = 0;
      const createdSucces = rows.map(async (row) => {
        const result = await timesheetRowSchema.validateAsync(row);
        const { timesheetId, projectId, taskId, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = result;

        const project = await models.Project.findOne({ where: { id: projectId } });
        if (!project) {
          throw new Error('Invalid project id');
        }
        const task = await models.Task.findOne({ where: { id: taskId } });
        if (!task) {
          throw new Error('Invalid task id');
        }

        const totalRowHours = monday + tuesday + wednesday + thursday + friday + saturday + sunday;
        timesheetTotalHours += totalRowHours;

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
        });

        console.log(createdSucces);

        if (createdSucces) {
          res.send({ success: 'Rows created' });
          return;
        }
        res.send('NOOOOO');
      });
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
