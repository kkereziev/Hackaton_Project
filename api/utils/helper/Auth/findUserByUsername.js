const { models } = require('../../../db/index');

module.exports = async (username) => {
  const user = await models.User.findOne({
    where: { username },
  });
  return user;
};
