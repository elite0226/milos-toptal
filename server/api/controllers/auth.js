const db = require('../db/models');
const { ROLES } = require('../constants');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: 'User is not found',
      });
    }

    db.User.checkPassword(password, user.password, async (err, isMatch) => {
      if (isMatch) {
        const token = await db.User.generateToken(user);
        return res.status(200).json({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
        });
      }

      return res.status(400).json({
        error: 'Password is not matched',
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const error = {};
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Validation
  if (!email) {
    error.email = 'Email is required';
  } else if (!emailRegEx.test(email)) {
    error.email = 'Email is not valid';
  }
  if (!password) {
    error.password = 'Password is required';
  }
  if (!firstName) {
    error.firstName = 'First name is required';
  }
  if (!lastName) {
    error.lastName = 'Last name is required';
  }
  if (!role) {
    error.role = 'Role is required';
  } else if ([ROLES.USER, ROLES.OWNER].indexOf(role) < 0) {
    error.role = 'Invalid role';
  }

  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }

  try {
    const user = await db.User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    const token = await db.User.generateToken(user);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.errors && err.errors[0].message === 'email must be unique') {
      return res.status(409).json({
        error: 'Email is already used',
      });
    }
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const getUser = async (req, res) => {
  return res.json({ user: req.user });
};

const updateUser = async (req, res) => {
  if (req.body.role === ROLES.ADMIN) {
    return res.status(400).json({
      error: 'Invalid role',
    });
  }

  try {
    await db.User.update(
      { ...req.body },
      {
        where: { id: req.user.id },
        individualHooks: true,
      }
    );

    const user = await db.User.findOne({
      where: { id: req.user.id },
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    });

    return res.status(200).json({ user });
  } catch (err) {
    if (err.errors && err.errors[0].message === 'email must be unique') {
      return res.status(409).json({
        error: 'Email is already taken',
      });
    }
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await db.User.destroy({
      where: { id: req.user.id },
    });

    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      error: err.toString(),
    });
  }
};

module.exports = {
  login,
  signup,
  getUser,
  updateUser,
  deleteUser,
};
