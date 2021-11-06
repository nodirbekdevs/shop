const express = require('express')
const {getProducts, getProduct, getCountProducts, getFeaturedProducts,  makeProduct, updateProduct, deleteProduct} = require('./../views/productViews')

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.get('/count', getCountProducts)
router.get('/featured/:count', getFeaturedProducts)
router.post('/create', makeProduct)
router.put('/edit/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)

module.exports = router
