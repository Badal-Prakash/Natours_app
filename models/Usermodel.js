const mongoose = require('mongoose');

const validator = require('validator');

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'username required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'user must have a valid email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email address']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'user must have at least password'],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirmPassword must be same as password']
  }
});

const User = mongoose.model('User', userschema);

module.exports = User;
