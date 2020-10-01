const router = require('express').Router();
const passport = require('passport');

const TimesheetController = require('../controllers/timesheet');

router.get('/getAll', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.get.allTimesheets);
router.get('/getDates', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.get.getDates);
router.get('/:id', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.get.timesheetRows);
router.post('/', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.post.createTimesheet);
router.patch('/rows', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.patch.createTimesheetRow);
router.patch('/:id', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.patch.updateTimesheet);
router.delete('/:id', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.remove.deleteTimesheet);

module.exports = router;
