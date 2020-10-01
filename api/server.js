const express = require('express');
const { middlewareSetup, routesSetup, config } = require('./config');
const sequelize = require('./db/index');
require('dotenv').config();

const app = express();

let server;
// checking db connection and establishing server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    // init middleware
    middlewareSetup(app);
    // init routes
    routesSetup(app);

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
      });

      console.log('*'.repeat(90));
    });

    // listen
    switch (process.env.NODE_ENV) {
      case 'test':
        server = app.listen(config.port, () => {
          console.log(`[Test] Server is under testing`);
        });
        break;
      case 'development':
        server = app.listen(config.port, () => {
          console.log(`[Development] Server is listening at port ${config.port}`);
        });
        break;
      case 'production':
        server = app.listen(config.port, () => {
          console.log(`[Production] Server is listening at port ${config.port}`);
        });
        break;
      default:
        console.log(`Wrong environment configuration`);
        break;
    }
  })
  .catch((err) => console.log(err));

//  Graceful shutdown
module.exports = app;
function gracefulShutdown() {
  console.log('Starting to shutdown...');

  server.close(() => {
    console.log('Closed out remaining connections');

    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');

    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
