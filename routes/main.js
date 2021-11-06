const express = require('express')
const brandRoutes = require('./brandRoutes')
const categoryRoutes = require('./categoryRoutes')
const productRoutes = require('./productRoutes')
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')
const orderRoutes = require('./orderRoutes')
const {IsAuthenticated} = require('./../utils/keys')
const {IsAdminUser} = require('./../middleware/admin')

const main = express()

main.use('/brands', brandRoutes)
main.use('/categories', categoryRoutes)
main.use('/products', productRoutes)
main.use('/users', IsAuthenticated, userRoutes)
main.use('/auth', authRoutes)
main.use('/orders', IsAuthenticated, orderRoutes)

module.exports = main
