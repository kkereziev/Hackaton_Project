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

module.exports = {
  createValidUser,
  userWithExistingUsername,
  userWithInvalidUsername,
};
