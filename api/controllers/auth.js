const { models, Op } = require('../db/index');
const { findUserByUsername, jwt } = require('../utils');
const { authCookieName } = require('../config/config');

const post = {
  async register(req, res, next) {
    const { username, password } = req.body;
    const newUser = await models.User.create({
      username,
      phash: password,
    }).catch(next);
    res.send(newUser);
  },
  async login(req, res, next) {
    const { username, password } = req.body;
    const user = await findUserByUsername(username).catch(next);

    const match = await user.matchPassword(password).catch(next);

    if (!match) {
      res.status(401).send('Invalid password');
      return;
    }
    const token = jwt.createToken({ id: user.id });
    res.cookie(authCookieName, token).send(user);
  },
  async logout(req, res, next) {
    // const token = req.cookies[authCookieName];

    res.clearCookie(authCookieName).json({ success: true });
  },
};
module.exports = { post };
