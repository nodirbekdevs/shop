const Order = require('./../models/orderModel')
const OrderItem = require('./../models/orderItemModel')
const User = require('./../models/userModel')
const Product = require('./../models/productModel')

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('orderItems', 'user', 'name').sort({'dateOrdered': -1})
    if (!orders) res.status(404).json({message: 'Orders can not be found'})
    res.status(200).json(orders)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems', 'user', 'name').sort({'dateOrdered': -1})
    if (!order) res.status(404).json({message: 'Category can not be found'})
    res.status(200).json(order)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeOrder = async (req, res) => {
  const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product
    })
    newOrderItem = await newOrderItem.save();
    return newOrderItem._id;
  }))
  const orderItemsIdsResolved = await orderItemsIds;
  const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
    const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
    const totalPrice = orderItem.product.price * orderItem.quantity;
    return totalPrice
  }))
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  })
  order = await order.save();
  if (!order) return res.status(400).send('the order cannot be created!')
  res.send(order);
}

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true})
    if (!order) res.status(404).json({message: 'Category can not be updated'})
    res.status(200).json(order)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteOrder = async (req, res) => {
  Order.findByIdAndRemove(req.params.id).then(async order =>{
    if(order) {
      await order.orderItems.map(async orderItem => {
        await OrderItem.findByIdAndRemove(orderItem)
      })
      return res.status(200).json({success: true, message: 'the order is deleted!'})
    } else {
      return res.status(404).json({success: false , message: "order not found!"})
    }
  }).catch(err=>{
    return res.status(500).json({success: false, error: err})
  })
}

const orderTotalSales = async (req, res) => {
  const totalSales= await Order.aggregate([{ $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}])
  if(!totalSales) return res.status(400).send('The order sales cannot be generated')
  res.send({totalsales: totalSales.pop().totalsales})
}

const ordersCount = async (req, res) => {
  const orderCount = await Order.countDocuments((count) => count)
  if(!orderCount) res.status(500).json({success: false})
  res.send({orderCount: orderCount});
}

const userOrders = async (req, res) => {
  const userOrderList = await Order.find({user: req.params.user.id}).populate({
    path: 'orderItems', populate: {
      path : 'product', populate: 'category'}
  }).sort({'dateOrdered': -1});
  if(!userOrderList) res.status(500).json({success: false})
  res.send(userOrderList);
}


module.exports = {getOrders, getOrder, makeOrder, updateOrder, deleteOrder}
