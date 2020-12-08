const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, SALT_ROUNDS } = process.env;

const { ROLES } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM({
        values: Object.values(ROLES),
      }),
    },
  });

  User.checkPassword = (password, savedPassword, done, user) => {
    bcrypt.compare(password, savedPassword, (err, isMatch) => {
      if (err) {
        return done(null, false);
      }
      if (isMatch) {
        return done(null, true);
      }
      return done(null, false);
    });
  };

  User.generateToken = async (user) => {
    const payload = {
      id: user.id,
    };
    return await jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  };

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    if (user._previousDataValues.password !== user.password) {
      return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            return reject('Failed to generate hash');
          }
          return resolve(hash);
        });
      })
        .then((hash) => {
          user.password = hash;
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  });

  return User;
};
