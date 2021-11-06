const mongoose = require('mongoose');

const Schema = mongoose.Schema
const model = mongoose.model

const category = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  icon: {type: String},
  color: {type: String},
})

const Category = model('Category', category)

module.exports = Category
