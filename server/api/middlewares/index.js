const db = require('../db/models');

const checkRole = (roles) => (req, res, next) => {
  if (roles.indexOf(req.user.role) >= 0) {
    next();
    return;
  }

  return res.status(403).json({
    error: "You don't have permission",
  });
};

const checkRestaurantExist = async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await db.Restaurant.findOne({
    where: { id: restaurantId },
  });
  if (!restaurant) {
    return res.status(404).json({
      error: 'Restaurant not found',
    });
  }
  next();
};

module.exports = {
  checkRole,
  checkRestaurantExist,
};
