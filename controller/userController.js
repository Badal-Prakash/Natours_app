const User = require('./../models/Usermodel');

exports.getallusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: '<route not defined>'
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: '<route not defined>'
  });
};
exports.patchUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: '<route not defined>'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: '<route not defined>'
  });
};
