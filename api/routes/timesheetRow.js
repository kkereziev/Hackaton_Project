const router = require('express').Router();
const passport = require('passport');
const TimesheetRowController = require('../controllers/timesheetRow');

router.get('/:name', passport.authenticate('JwtStrategy', { session: false }), TimesheetRowController.get.getTimesheetRows);
router.patch('/:timesheetId', passport.authenticate('JwtStrategy', { session: false }), TimesheetRowController.patch.createTimesheetRow);

module.exports = router;
