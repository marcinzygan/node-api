const mongoose = require('mongoose');
// eslint-disable-next-line import/newline-after-import
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A username is required'],
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, ' Please confirm your password'],
    validate: {
      //THIS ONLY WORKS ON CREATE AND SAVE
      validator: function (val) {
        return val === this.password;
      },
      message: 'A password did not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this function if password was modified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
