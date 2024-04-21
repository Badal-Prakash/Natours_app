const mongoose = require('mongoose');
const validator = require('validator'); // to use custom validator functions
const bcrypt = require('bcryptjs'); //to encrypt password before sending
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
    validate: [validator.isEmail, 'please enter a valid email address'] //to validate email is correct or not
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'user must have at least password'],
    minlength: 8,
    select: false
  },
  passwordChangedAt: { type: Date, default: Date.now() },
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
//only work on save or create
//normal function is used beacuse we need this keyword here in arrow function this keyword is not available
userschema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined; // to remove confirm password from data base
  next();
});

userschema.methods.correctPassword = async function(
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

userschema.methods.changedpasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userschema);

module.exports = User;
