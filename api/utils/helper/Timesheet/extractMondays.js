const date = require('date.js');

module.exports = () => {
  let isMonday;
  if (new Date().getDay() === 1) {
    isMonday = date('this monday');
  } else {
    isMonday = date('last monday');
  }

  return [date('last monday', isMonday), isMonday, date('after 7 days', isMonday), date('after 14 days', isMonday)];
};
