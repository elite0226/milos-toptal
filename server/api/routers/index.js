const express = require('express');
const passport = require('passport');

const authRouter = require('./auth');
const restaurantRouter = require('./restaurant');
const userRouter = require('./user');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/restaurants', passport.authenticate('jwt', { session: false }), restaurantRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), userRouter);

module.exports = router;
