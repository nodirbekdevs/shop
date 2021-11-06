const express = require('express')
const {getCategories, getCategory, makeCategory, updateCategory, deleteCategory} = require('./../views/categoryViews')
const {IsAuthenticated} =require('./../utils/keys')
const IsAdminUser = require('./../middleware/admin')

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/create', makeCategory)
router.put('/edit/:id', updateCategory)
router.delete('/delete/:id', [IsAuthenticated, IsAdminUser], deleteCategory)

module.exports = router
