const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A username is required'],
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
  },
  password: {
    type: String,
  },
  passwordConfirm: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
