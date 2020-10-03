const createValidUser = {
  username: 'Ivan4o',
  password: 'validPassword',
};

const userWithExistingUsername = {
  username: 'Ivan4o',
  password: 'validPassword',
};

const userWithInvalidUsername = {
  username: 'Ivan',
  password: 'validPassword',
};

const userWithoutUsername = {
  password: 'validPassword',
};

const userWithoutPassword = {
  username: 'Ivan',
};

const shouldLogin = {
  username: 'Ivan4o',
  password: 'validPassword',
};

const shouldNotLogin = {
  username: 'Ivan4o',
  password: 'invalidPassword',
};

module.exports = {
  createValidUser,
  userWithExistingUsername,
  userWithInvalidUsername,
  userWithoutUsername,
  userWithoutPassword,
  shouldLogin,
  shouldNotLogin,
};
