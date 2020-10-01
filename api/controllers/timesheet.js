const date = require('date.js');
const jwt = require('jsonwebtoken');
const { models, Op } = require('../db/index');
const { extractMondays, extractPertsOfDate, checkIfDateIsRight } = require('../utils/index');
const { secret } = require('../config/config');
const cookieExtractor = require('../utils/cookieExtractor');

const get = {
  async allTimesheets(req, res, next) {
    console.log(req.user.dataValues.id);
    // req.user = decoded.user;
  },

  async timesheet(req, res, next) {
    console.log('timesheet');
  },

  getDates(req, res, next) {
    const dates = extractMondays();

    res.send({ dates });
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
      const finalDay = date('after 6 days', startDate);
      res.send(finalDay);
    } else {
      res.send('Uppss');
    }

    //models.Timesheet.create();
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
