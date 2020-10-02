const date = require('date.js');

function lastDay(startingDate) {
  return date('after 6 days', startingDate);
}
module.exports = lastDay;
