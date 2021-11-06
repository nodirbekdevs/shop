const mongoose = require('mongoose')
const Product = require('./../models/productModel')
const Category = require('./../models/categoryModel')
const Brand = require('./../models/brandModel')

const getProducts = async (req, res) => {
  try {
    let filter = {}
    if (req.query.categories) filter = {category: req.query.categories.split(',')}
    const products = await Product.find(filter).populate('category brand')
    if (!products) res.status(404).json({message: 'Products can not be found'})
    res.status(200).json(products)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category brand')
    if (!product) res.status(404).json({message: 'Products can not be found'})
    res.status(200).json(product)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getCountProducts = async (req, res) => {
  try {
    const products = await Product.countDocuments((count) => count)
    if (!products) res.status(400).json({message: 'Not products'})
    res.status(200).json({count: products})
  } catch (e) {
    res.status(500).json(e)
  }
}

const getFeaturedProducts = async (req, res) => {
  try {
    const {count} = req.params ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count)
    if (!products) res.status(400).json({message: 'Not featured products'})
    res.status(200).json(products)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeProduct = async (req, res) => {
  const category = await Category.findById(req.body.category)
  if (!category) res.status(404).json({message: 'Invalid category'})
  const brand = await Brand.findById(req.body.brand)
  if (!brand) res.status(404).json({message: 'Invalid brand'})
  const {name, description, richDescription, image, price, countInStock, rating, numReviews, isFeatured} = req.body
  const product = new Product({
    name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured
  })
  try {
    await product.save()
    if (!product) return res.status(404).json({message: 'Category can not be made'})
    res.status(200).json(product)
  } catch (e) {
    res.status(500).json(e)
  }
}

const updateProduct = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) res.status(400).json({message: 'Invalid Product Id'})
    const category = await Category.findById(req.body.category)
    if (!category) res.status(400).json({message: 'Invalid category'})
    const brand = await Brand.findById(req.body.brand)
    if (!brand) res.status(404).json({message: 'Invalid brand'})
    const {name, description, richDescription, image, price, countInStock, rating, numReviews, isFeatured} = req.body
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name, description, richDescription, image, brand, price, category, countInStock, rating, numReviews, isFeatured
    }, {new: true})
    if (!product) return res.status(404).json({message: 'Category can not be made'})
    res.status(200).json(product)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteProduct = async (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(product => {
    if (product) return res.status(200).json({success: true, message: 'The brand has deleted'})
    else return res.status(404).json({success: true, message: 'Brand has not deleted'})
  }).catch(e => {
    res.status(500).json(e)
  })
}

module.exports = {getProducts, getProduct, getCountProducts, getFeaturedProducts, makeProduct, updateProduct, deleteProduct}
