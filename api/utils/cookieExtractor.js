const { authCookieName } = require('../config/config');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[authCookieName];
  }
  return token;
};
module.exports = cookieExtractor;
