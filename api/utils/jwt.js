const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

function createToken(data) {
  return jwt.sign(data, secret, { expiresIn: '6h' });
}

module.exports = {
  createToken,
};
