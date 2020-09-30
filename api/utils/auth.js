const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { secret } = require('../config/config');
const { models } = require('../db/index');
const cookieExtractor = require('./cookieExtractor');

const options = {
  jwtFromRequest: cookieExtractor, // callback
  secretOrKey: secret,
};
const passportConfig = new JwtStrategy(options, (jwt_payload, done) => {
  models.User.findOne({ where: { id: jwt_payload.id } })
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => done(err, false));
});
passport.use('JwtStrategy', passportConfig);
module.exports = passport;
