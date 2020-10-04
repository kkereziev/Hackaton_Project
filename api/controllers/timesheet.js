/* eslint-disable no-await-in-loop */
const { models, Op } = require('../db/index');
const { extractMondays, extractPertsOfDate, checkIfDateIsRight, lastDay } = require('../utils/index');

const get = {
  async allTimesheets(req, res, next) {
    const { id } = req.user.dataValues;

    const allTimesheetsForUser = await models.Timesheet.findAll({
      where: { userId: id },
    }).catch(next);

    res.json(allTimesheetsForUser);
  },

  async getProjects(req, res, next) {
    try {
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
      }).catch(next);

      res.json(projects);
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  },

  async getDates(req, res, next) {
    const { id } = req.user.dataValues;
    const dates = extractMondays();

    const datesFinal = await Promise.all(
      dates.map(async (date) => {
        const [finalEndDay, finalMonth, finalYear] = extractPertsOfDate(date);
        const dateString = `${finalMonth + 1}-${finalEndDay}-${finalYear}`;
        const findDate = await models.Timesheet.findOne({ where: { name: { [Op.like]: `${dateString}%` }, userId: id } }).catch(next);
        const doesExist = !!findDate;

        return { name: dateString, isSubmitted: doesExist, startDate: date };
      })
    );

    res.json(datesFinal);
  },
};

const post = {
  async createTimesheet(req, res, next) {
    try {
      const { id } = req.user.dataValues;
      const { startDate, name } = req.body;
      const startingDate = new Date(startDate);

      if (!(startingDate instanceof Date) || !name) {
        throw new Error('Not a date');
      }

      const partsOfTheSubbmitedDate = extractPertsOfDate(startingDate);

      const dates = extractMondays();

      const doesDayMatch = checkIfDateIsRight(partsOfTheSubbmitedDate, dates);

      if (!doesDayMatch) {
        throw new Error('Invalid starting date');
      }
      const finalDay = lastDay(startingDate);

      const [finalEndDay, finalMonth, finalYear] = extractPertsOfDate(finalDay);

      const timesheetName = `${name} to ${finalMonth + 1}-${finalEndDay}-${finalYear}`;

      const newTimesheet = await models.Timesheet.create({ name: timesheetName, startDate, isSubmitted: false, userId: id, totalHours: 0 }).catch(
        next
      );

      res.status(201).send(newTimesheet);
    } catch (err) {
      res.status(422).send({ err: err.message });
    }
  },
};

const remove = {
  async deleteTimesheet(req, res, next) {
    try {
      const { timesheetId } = req.params;

      const existsTimesheet = await models.Timesheet.findOne({ where: { id: timesheetId } }).catch(next);

      if (!existsTimesheet || existsTimesheet.isSubmitted === true) {
        throw new Error("Can't delete timesheet");
      }
      await models.Timesheet.destroy({ where: { id: timesheetId } }).catch(next);
      await models.TimesheetRow.destroy({ where: { timesheetId } }).catch(next);

      res.send({ success: 'Timesheet deleted' });
    } catch (err) {
      res.status(409).json({ error: err.message });
    }
  },
};

module.exports = { get, post, remove };
