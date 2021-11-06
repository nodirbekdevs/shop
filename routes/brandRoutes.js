const express = require('express')
const {getBrands, getBrand, makeBrand, updateBrand, deleteBrand} = require('./../views/brandViews')

const router = express.Router()

router.get('/', getBrands)
router.get('/:id', getBrand)
router.post('/create', makeBrand)
router.put('/edit/:id', updateBrand)
router.delete('/delete/:id', deleteBrand)

module.exports = router
