const express = require('express');

const restaurantController = require('../controllers/restaurant');
const middlewares = require('../middlewares');
const { ROLES } = require('../../constants');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.get)
  .post(middlewares.checkRole([ROLES.OWNER, ROLES.ADMIN]), restaurantController.create);

router
  .route('/:restaurantId')
  .put(
    middlewares.checkRole([ROLES.ADMIN]),
    middlewares.checkRestaurantExist,
    restaurantController.update
  )
  .delete(
    middlewares.checkRole([ROLES.ADMIN]),
    middlewares.checkRestaurantExist,
    restaurantController.remove
  );

module.exports = router;
