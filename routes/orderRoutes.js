const express = require('express')
const {getOrders, getOrder, makeOrder, updateOrder, deleteOrder} = require('./../views/orderViews')

const router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/create', makeOrder)
router.put('/edit/:id', updateOrder)
router.delete('/delete/:id', deleteOrder)

module.exports = router
