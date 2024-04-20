const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userschema = new mongoose.Schema({
  name: {
    type: String
    // required: [true, 'username required'],
    // unique: true
  },
  email: {
    type: String
    // required: [true, 'user must have a valid email address'],
    // unique: true,
    // lowercase: true,
    // validate: [validator.isEmail, 'please enter a valid email address']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'user must have at least password']
    // minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'confirmPassword must be same as password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'confirmPassword must be same as password'
    }
  }
});

userschema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
const User = mongoose.model('User', userschema);

module.exports = User;
