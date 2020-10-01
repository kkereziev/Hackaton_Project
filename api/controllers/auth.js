const { models, Op } = require('../db/index');
const { findUserByUsername, jwt, loginSchema, registerSchema } = require('../utils');
const { authCookieName } = require('../config/config');

const post = {
  async register(req, res, next) {
    try {
      const result = await registerSchema.validateAsync(req.body);
      const { username, password } = result;
      const findUser = await findUserByUsername(username);
      if (findUser) {
        return res.status(409).send({ error: 'username already exists' });
      }

      const newUser = await models.User.create({
        username,
        phash: password,
      }).catch(next);
      newUser['phash'] = undefined;
      return res.send(newUser);
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid ${err.details[0].path}` });
      }
      res.status(400).send({ error: err });
    }
  },
  async login(req, res, next) {
    try {
      const result = await loginSchema.validateAsync(req.body);

      const user = await findUserByUsername(result.username).catch(next);
      if (!user) {
        throw new Error();
      }
      const match = await user.matchPassword(result.password).catch(next);

      if (!match) {
        throw new Error();
      }

      const token = jwt.createToken({ id: user.id });
      res.cookie(authCookieName, token).send({ username: user.username });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid credentials` });
      }
      res.status(400).send({ error: `Invalid credentials` });
    }
  },
  async logout(req, res, next) {
    // const token = req.cookies[authCookieName];

    res.clearCookie(authCookieName).json({ success: true });
  },
};
module.exports = { post };