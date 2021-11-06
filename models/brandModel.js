const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const brand = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  country: {type: String, required: true},
  image: {type: String},
})

const Brand = model('Brand', brand)

module.exports = Brand
