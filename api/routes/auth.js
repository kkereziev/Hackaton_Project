const router = require('express').Router();
const auth = require('../controllers/auth');
const { passport } = require('../utils');

router.post('/register', auth.post.register);
router.post('/login', auth.post.login);
router.post('/logout', passport.authenticate('JwtStrategy', { session: false }), auth.post.logout);

module.exports = router;
