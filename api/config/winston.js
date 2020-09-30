const { createLogger, transports, format } = require('winston');

const loggingWinston = createLogger({
  transports: [
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

loggingWinston.stream = {
  write: (message, encoding) => {
    loggingWinston.info(message);
  },
};

module.exports = { loggingWinston };
