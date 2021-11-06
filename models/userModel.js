const mongoose = require('mongoose');

const Schema = mongoose.Schema
const model = mongoose.model

const user = new Schema({
  name: {type: String, required: true,},
  email: {type: String, required: true,},
  username: {type: String, required: true},
  password: {type: String, required: true,},
  isAdmin: {type: Boolean, default: false,},
  phone: {type: String, default: ''},
  street: {type: String, default: ''},
  apartment: {type: String, default: ''},
  zip: {type: String, default: ''},
  city: {type: String, default: ''},
  country: {type: String, default: ''}
})

const User = model('User', user);

module.exports = User
