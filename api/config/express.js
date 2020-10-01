const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { loggingWinston } = require('./winston');

module.exports = (app) => {
  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(logger('combined', { stream: loggingWinston.stream }));
  app.use(passport.initialize());

  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(cookieParser());
};
