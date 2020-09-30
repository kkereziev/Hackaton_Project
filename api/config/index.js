const config = require('./config');
const database = require('./database');
const middlewareSetup = require('./express');
const routesSetup = require('./routes');
const winston = require('./winston');

module.exports = { winston, config, database, middlewareSetup, routesSetup };
