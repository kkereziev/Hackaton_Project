const { authCookieName } = require('../config/config');

const cookieExtractor = (req) => {
  console.log(req.cookies);
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[authCookieName];
  }
  return token;
};
module.exports = cookieExtractor;
