const Brand = require('./../models/brandModel')

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
    if (!brands) res.status(404).json({message: 'The brands can not be found'})
    res.status(200).json(brands)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
    if (!brand) res.status(404).json({message: 'The brand can not be found'})
    res.status(200).json(brand)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeBrand = async (req, res) => {
  try {
    const {name, description, country, image} = req.body
    const brand = await new Brand({name, description, country, image}).save()
    if (!brand) res.status(404).json({message: 'The brand can not be made'})
    res.status(200).json(brand)
  } catch (e) {
    console.log(e)
  }
}

const updateBrand = async (req, res) => {
  try {
    const {name, description, country, image} = req.body
    const brand = await Brand.findByIdAndUpdate(req.params.id, {name, description, country, image}, {new: true})
    if (!brand) res.status(404).json({message: 'The brand can not be updated'})
    res.status(200).json(brand)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteBrand = async (req, res) => {
  Brand.findByIdAndDelete(req.params.id).then(brand => {
    if (brand) return res.status(200).json({success: true, message: 'The brand has deleted'})
    else return res.status(404).json({success: true, message: 'Brand has not deleted'})
  }).catch(e => {
    res.status(500).json(e)
  })
}

module.exports = {getBrands, getBrand, makeBrand, updateBrand, deleteBrand}
