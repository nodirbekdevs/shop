const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const orderItem = new Schema({
  quantity: {type: Number, required: true},
  product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
})

const OrderItem = model('OrderItem', orderItem)

module.exports = OrderItem
