const date = require('date.js');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { models, Op } = require('../db/index');
const { extractMondays, extractPertsOfDate, checkIfDateIsRight, lastDay } = require('../utils/index');
const { secret } = require('../config/config');
const cookieExtractor = require('../utils/cookieExtractor');

const get = {
  async allTimesheets(req, res, next) {
    console.log(req.user.dataValues.id);
  },

  async timesheet(req, res, next) {
    console.log('timesheet');
  },

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

    res.send(datesFinal);
  },
};

const post = {
  async createTimesheet(req, res, next) {
    const { id } = req.user.dataValues;
    const { startDate } = req.body;
    const startingDate = new Date(startDate);
    if (!(startingDate instanceof Date)) {
      res.status(404).json({ error: 'Not a date' });
    }
    const partsOfTheSubbmitedDate = extractPertsOfDate(startingDate);
    const dates = extractMondays();
    const doesDayMatch = checkIfDateIsRight(partsOfTheSubbmitedDate, dates);

    if (doesDayMatch) {
      const [startDay, startMonth, startYear] = extractPertsOfDate(startingDate);
      const finalDay = lastDay(startingDate);

      const [finalEndDay, finalMonth, finalYear] = extractPertsOfDate(finalDay);
      const name = `${startMonth + 1}-${startDay}-${startYear} to ${finalMonth + 1}-${finalEndDay}-${finalYear}`;
      const newTimesheet = await models.Timesheet.create({ name, startDate, isSubmitted: false, userId: id, totalHours: 0 });
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
};

const remove = {
  async deleteTimesheet(req, res, next) {
    console.log('deleteTimesheet');
  },
};

module.exports = { get, post, patch, remove };
