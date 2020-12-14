const express = require('express');

const userController = require('../controllers/user');
const middlewares = require('../middlewares');
const { ROLES } = require('../constants');

const router = express.Router();

router.use(middlewares.checkRole([ROLES.ADMIN]));

router.route('/').get(userController.get);

module.exports = router;
