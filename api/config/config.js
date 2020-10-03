const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 8080,
    authCookieName: 'x-auth-token',
    secret: process.env.JWT_SECRET,
    corsConfig: {
      origin: ['http://localhost:5000', 'http://localhost:8080', 'http://localhost:3000'],
      credentials: true,
    },
  },
  test: {
    port: process.env.PORT || 8080,
    authCookieName: 'x-auth-token',
    secret: process.env.JWT_SECRET,
    corsConfig: {
      origin: ['http://localhost:5000', 'http://localhost:8080', 'http://localhost:3000'],
      credentials: true,
    },
  },
};

module.exports = config[env];
