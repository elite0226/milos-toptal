const db = require('../db/models');

const get = async (req, res) => {
  const { restaurantId } = req.params;
  const { limit, offset } = req.query;

  try {
    const restaurant = await db.Restaurant.findOne({
      where: { id: restaurantId },
    });
    const reviews = await db.Review.findAll({
      where: { restaurantId },
      attributes: ['id', 'rating', 'visitDate', 'comment', 'reply'],
      include: [
        {
          model: db.User,
          foreignKey: 'reviewerId',
          as: 'reviewer',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      limit,
      offset,
      order: [['visitDate', 'DESC']],
    });
    const highest = await db.Review.max('rating', {
      where: { restaurantId },
    });
    const lowest = await db.Review.min('rating', {
      where: { restaurantId },
    });
    const myReview = await db.Review.findOne({
      where: { restaurantId, reviewerId: req.user.id },
    });
    const totalCount = await db.Review.count({
      where: { restaurantId },
    });

    return res.status(200).json({
      reviews,
      average: restaurant.avgRating,
      highest,
      lowest,
      canReply: !myReview,
      totalCount,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const create = async (req, res) => {
  const { rating, visitDate, comment, reviewerId, reply } = req.body;
  const { restaurantId } = req.params;

  // validation
  const error = {};
  if (!rating) {
    error['rating'] = 'Rating is required';
  } else if (rating < 1 || rating > 5) {
    error['rating'] = 'Rating should be in 1 to 5';
  }
  if (!visitDate) {
    error['visitDate'] = 'Visit date is required';
  } else if (new Date(visitDate) > new Date()) {
    error['visitDate'] = 'Visit date cannot be future';
  }
  if (!comment) error['comment'] = 'Comment is required';
  if (!reviewerId) error['reviewer'] = 'Reviewer is required';
  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }
  const myReview = await db.Review.findOne({
    where: { restaurantId, reviewerId: req.user.id },
  });
  if (myReview) {
    return res.status(400).json({
      error: 'Review is already left to this restaurant',
    });
  }

  try {
    const review = await db.Review.create({
      rating,
      visitDate,
      comment,
      restaurantId,
      reviewerId,
      reply,
    });
    const restaurant = await db.Restaurant.findOne({
      where: { id: restaurantId },
    });
    await db.Restaurant.update(
      {
        avgRating:
          (restaurant.avgRating * restaurant.numberOfReviews + rating) /
          (restaurant.numberOfReviews + 1),
        numberOfReviews: restaurant.numberOfReviews + 1,
      },
      { where: { id: restaurantId } }
    );
    return res.status(201).json({
      review,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const update = async (req, res) => {
  const { reviewId, restaurantId } = req.params;

  try {
    const oldReview = await db.Review.findOne({
      where: { id: reviewId },
    });
    await db.Review.update({ ...req.body }, { where: { id: reviewId, restaurantId } });

    const review = await db.Review.findOne({
      where: { id: reviewId },
    });
    const restaurant = await db.Restaurant.findOne({
      where: { id: restaurantId },
    });
    await db.Restaurant.update(
      {
        avgRating:
          (restaurant.avgRating * restaurant.numberOfReviews + review.rating - oldReview.rating) /
          restaurant.numberOfReviews,
      },
      { where: { id: restaurantId } }
    );

    return res.status(200).json({ review });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const remove = async (req, res) => {
  const { reviewId, restaurantId } = req.params;

  try {
    const review = await db.Review.findOne({
      where: { id: reviewId },
    });
    const restaurant = await db.Restaurant.findOne({
      where: { id: restaurantId },
    });
    await db.Restaurant.update(
      {
        avgRating:
          restaurant.numberOfReviews === 1
            ? 0
            : (restaurant.avgRating * restaurant.numberOfReviews - review.rating) /
              (restaurant.numberOfReviews - 1),
        numberOfReviews: restaurant.numberOfReviews - 1,
      },
      { where: { id: restaurantId } }
    );
    await db.Review.destroy({
      where: { id: reviewId, restaurantId },
    });
    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
};
