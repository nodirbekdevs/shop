const Category = require('./../models/categoryModel')

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    if (!categories) res.status(404).json({message: 'Categories can not be found'})
    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(404).json({message: 'Category can not be found'})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeCategory = async (req, res) => {
  const {name, description, icon, color} = req.body
  const category = new Category({name, description, icon, color})
  try {
    await category.save()
    if (!category) res.status(404).json({message: 'Category can not be made'})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

const updateCategory = async (req, res) => {
  try {
    const {name, description, icon, color} = req.body
    const category = await Category.findByIdAndUpdate(
      req.params.id, {name, description, icon, color}, {new: true}
    )
    if (!category) res.status(404).json({message: 'Category can not be updated'})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteCategory = async (req, res) => {
  try {
    Category.findByIdAndDelete(req.params.id).then(category => {
      if (category) {
        return res.status(500).json({success: true, message: 'The category has deleted'})
      } else {
        return res.status(500).json({success: true, message: 'The category has not deleted'})
      }
    }).catch(error => {
      return res.status(400).json({success: false, error: error})
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports = {getCategories, getCategory, makeCategory, updateCategory, deleteCategory}
