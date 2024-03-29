module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
        max: 5,
      },
    },
    visitDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reply: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id',
      },
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'reviewerId',
      as: 'reviewer',
      onDelete: 'CASCADE',
    });

    Review.belongsTo(models.Restaurant, {
      foreignKey: 'restaurantId',
      as: 'restaurant',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
