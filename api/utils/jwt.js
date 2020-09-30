const jwt = require('jsonwebtoken');
const { config } = require('../config');

function createToken(data) {
  return jwt.sign(data, config.secret, { expiresIn: '6h' });
}

module.exports = {
  createToken,
};
