const { models, Op } = require('../db/index');
const { findUserByUsername, jwt, loginSchema, registerSchema } = require('../utils');
const { authCookieName } = require('../config/config');

const get = {
  async getMe(req, res, next) {
    try {
      const user = req.user.dataValues;
      user.phash = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    } catch (err) {
      res.status(401).send({ error: 'Unauthorized' });
    }
  },
};

const post = {
  async register(req, res, next) {
    try {
      const result = await registerSchema.validateAsync(req.body);
      const { username, password } = result;
      const findUser = await findUserByUsername(username);
      if (findUser) {
        return res.status(409).send({ error: 'Username already exists!' });
      }

      const newUser = await models.User.create({
        username,
        phash: password,
      }).catch(next);

      newUser.phash = undefined;

      return res.status(201).send(newUser);
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid ${err.details[0].path}` });
      }
      res.status(400).send({ error: err.message });
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
      return res.cookie(authCookieName, token).send({ username: user.username });
    } catch (err) {
      if (err.isJoi === true) {
        return res.status(422).send({ error: `Invalid username or password.` });
      }
      return res.status(401).send({ error: `Invalid username or password.` });
    }
  },
  async logout(req, res, next) {
    res.clearCookie(authCookieName).json({ success: true });
  },
};
module.exports = { get, post };
