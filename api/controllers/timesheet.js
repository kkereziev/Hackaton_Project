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
      res.send({ success: 'Timesheet deleted' });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  },
};

module.exports = { get, post, remove };
