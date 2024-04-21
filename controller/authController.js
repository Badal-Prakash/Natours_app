const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('./../models/Usermodel');

const AppError = require('./../utils/appError');

const catchAsync = require('./../utils/catchAsync');

// generatig jwt token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECREAT, {
    expiresIn: process.env.JWT_EXPIRES
  });
}; // to get jwt token from secret key that we passed and id

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });

    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
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

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required.'
    });
  }

  const user = await User.findOne({ email: email }).select('+password');
  //to verify password that is entered is correct or not
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Email and password are incorrect.'
    });
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'you are not authorized please login'
      });
    }
    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECREAT
      );
      console.log(decoded);
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'invalid token login again'
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required.'
    });
  }
};
