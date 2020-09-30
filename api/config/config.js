const env = process.env.NODE_ENV || 'development';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
  development: {
    port: process.env.PORT || 8080,
    authCookieName: 'x-auth-token',
    secret: process.env.JWT_SECRET,
  },
};

module.exports = config[env];
