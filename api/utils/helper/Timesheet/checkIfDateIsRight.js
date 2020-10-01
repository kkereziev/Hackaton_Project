const extractPertsOfDate = require('./extractPartsOfDate');

function checkIfDateIsRight(partsOfTheSubbmitedDate, dates) {
  let isValid = false;
  try {
    dates.map((date) => {
      if (date) {
        const dateParts = extractPertsOfDate(date);
        if (dateParts[0] === partsOfTheSubbmitedDate[0]) {
          if (dateParts[1] === partsOfTheSubbmitedDate[1]) {
            if (dateParts[2] === partsOfTheSubbmitedDate[2]) {
              isValid = true;
            }
          }
        }
      }
    });
  } catch (e) {
    isValid = false;
  }

  return isValid;
}

module.exports = checkIfDateIsRight;
