const express = require('express');
const passport = require('passport');

const authRouter = require('./auth');
const restaurantRouter = require('./restaurant');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/restaurants', passport.authenticate('jwt', { session: false }), restaurantRouter);

module.exports = router;
