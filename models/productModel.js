const mongoose = require("mongoose")
const {Id} = require('./../utils/keys')

const Schema = mongoose.Schema
const model = mongoose.model

const product = new Schema({
  name: {type:String, required: true},
  description: {type: String, required: true},
  richDescription: {type: String, default: ''},
  image: {type: String, default: ''},
  images: [{type: String}],
  brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
  price: {type: Number, default: 0},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  countInStock: {type: Number, required: true, min: 0, max: 255},
  rating: {type: Number, default: 0},
  numReviews: {type: Number, default: 0},
  isFeatured: {type: Boolean, default: false},
  dataCreated: {type: Date, default: Date.now()}
})

const Product = model('Product', product)

module.exports = Product
