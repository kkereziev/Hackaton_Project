const { models, Op } = require('../db/index');
const { jwt, getCurrentUser, findUserById, findUserByUsername } = require('../utils/index');
const config = require('../config/config');

const get = {
  // users
  async users(req, res, next) {
    const users = await models.User.findAll({
      include: [
        { model: models.UserBio, as: 'Bio' },
        { model: models.User, as: 'Follower' },
        { model: models.User, as: 'Following' },
        { model: models.Post, as: 'Posts' },
      ],
    }).catch(next);
    res.send(users);
  },
  // me
  async currentUser(req, res, next) {
    getCurrentUser(req)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },
  // {id}/posts
  async userPosts(req, res, next) {
    const userId = req.params.id;
    const user = await findUserById(userId).catch(next);
    res.send(user.Posts);
  },
  // {username}/exists
  async usernameExists(req, res, next) {
    const usernameToSearch = req.params.username;
    const user = await findUserByUsername(usernameToSearch).catch(next);
    if (user) {
      res.json({ exists: true });
      return;
    }
    res.json({ exists: false });
  },
  // users/{identifier}
  async getUserByIdentifier(req, res, next) {
    const identifier = req.params.identifier;
    let user;
    if (isNaN(identifier)) {
      user = await findUserByUsername(identifier).catch(next);
    } else {
      user = await findUserById(identifier).catch(next);
    }
    res.send(user);
  },
  // {id}/followers
  async followers(req, res, next) {
    const userId = req.params.id;
    const user = await findUserById(userId).catch(next);
    res.send(user['Follower']);
  },
  // {id}/following
  async following(req, res, next) {
    const userId = req.params.id;
    const user = await findUserById(userId).catch(next);
    res.send(user['Following']);
  },
};

const post = {
  //signup
  async register(req, res, next) {
    const { name, username, email, password } = req.body;
    const newUser = await models.User.create({
      name,
      username,
      email,
      phash: password,
    }).catch(next);

    const userRole = await models.Role.findOne({
      where: { name: 'user' },
    }).catch(next);

    await newUser.setRoles([userRole.id]).catch(next);
    res.send(newUser);
  },
  // signin
  async login(req, res, next) {
    const { username, password } = req.body;
    const user = await findUserByUsername(username).catch(next);
    const match = await user.matchPassword(password).catch(next);
    if (!match) {
      res.status(401).send('Invalid password');
      return;
    }
    const token = jwt.createToken({ id: user.id });
    res.cookie(config.authCookieName, token).send(user);
  },
  // signout
  async signout(req, res, next) {
    const token = req.cookies[config.authCookieName];

    res.clearCookie(config.authCookieName).json({ success: true });
  },
  // {id}/follow
  async follow(req, res, next) {
    const userToFollowId = req.params.id;
    const currentUser = await getCurrentUser(req).catch(next);
    await models.UserFollowers.create({
      followerId: currentUser.id,
      followingId: userToFollowId,
    }).catch(next);
    res.json({ success: true });
  },
  //{id}/uinfollow
  async unfollow(req, res, next) {
    const userToUnfollowId = req.params.id;
    const currentUser = await getCurrentUser(req).catch(next);

    const connection = await models.UserFollowers.findOne({
      where: {
        [Op.and]: [{ followerId: currentUser.id }, { followingId: userToUnfollowId }],
      },
    }).catch(next);
    await connection.destroy().catch(next);

    res.json({ success: true });
  },
};

const patch = {
  //users/me
  async updateUser(req, res, next) {
    const { caption, content, dateOfBirth, country, city, occupation } = req.body;
    const currentUser = await getCurrentUser(req).catch(next);
    await currentUser.createBio({ caption, content, dateOfBirth }).catch(next);
    res.json({ message: 'Updated!' });
  },
};

module.exports = { get, post, patch };
