const mongoose = require('mongoose');

//user schema

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
});
const User = (module.exports = mongoose.model('User', userSchema));
