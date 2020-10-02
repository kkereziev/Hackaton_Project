const router = require('express').Router();
const passport = require('passport');

const TimesheetController = require('../controllers/timesheet');

router.get('/getAll', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.get.allTimesheets);
router.get('/getDates', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.get.getDates);
router.get('/getProjects', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.get.getProjects);
router.post('/', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.post.createTimesheet);
router.delete('/:timesheetId', passport.authenticate('JwtStrategy', { session: false }), TimesheetController.remove.deleteTimesheet);

module.exports = router;
