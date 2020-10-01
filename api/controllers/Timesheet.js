const date = require('date.js');
const jwt = require('jsonwebtoken');
const { models, Op } = require('../db/index');
const { extractMondays } = require('../utils/index');
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

    const dates = extractMondays();
    dates.map((date) => )

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
