const { Op } = require('sequelize');

const db = require('../db/models');

const get = async (req, res) => {
  const { limit, offset } = req.query;

  try {
    let where = {
      [Op.not]: [{ id: req.user.id }],
    };

    const users = await db.User.findAll({
      where,
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
      limit,
      offset,
    });
    const totalCount = await db.User.count({
      where,
    });

    return res.status(200).json({ users, totalCount });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

module.exports = {
  get,
};
