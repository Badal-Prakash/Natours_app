const User = require('./../models/Usermodel');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    res.status(201).json({
      status: 'success',
      data: {
        User: newUser
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message
    });
  }
};
