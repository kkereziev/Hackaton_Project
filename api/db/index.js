'use strict';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const sequelize = new Sequelize(config.url, { config, logging: false });

const modelDefiners = [
  require('./models/Project'),
  require('./models/Task'),
  require('./models/Timesheet'),
  require('./models/TimesheetRow'),
  require('./models/User'),
];

modelDefiners.map((model) => {
  return model(sequelize, Sequelize.DataTypes);
});

const applyRelationships = require('./models/defineAssociations');

sequelize.sync();
applyRelationships(sequelize);
// instead of another require in the controllers
sequelize.Op = Sequelize.Op;

module.exports = sequelize;
