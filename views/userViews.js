const bcrypt = require('bcryptjs')
const User = require('./../models/userModel')
const {salt} = require('./../utils/keys')

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    if (!users) res.status(404).json({message: 'Categories can not be found'})
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) res.status(404).json({message: 'Category can not be found'})
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getUsersCount = async (req, res) => {
  try {
    const users = await User.countDocuments(count => count)
    if (!users) res.status(400).json({message: 'Not products'})
    res.status(200).json({count: users})
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeUser = async (req, res) => {
  const {name, email, username, password, isAdmin, phone, street, apartment, zip, city, country} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    res.status(409).json({message: 'Такой email уже занят. Попробуйте другой'})
  } else {
    const user = new User(
      {name, email, username, password: bcrypt.hashSync(password, salt), isAdmin, phone, street, apartment, zip, city, country}
      )
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

const updateUser = async (req, res) => {
  try {
    const {name, email, password, isAdmin, phone, street, apartment, zip, city, country} = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {name, email, password: bcrypt.hashSync(password, salt), isAdmin, phone, street, apartment, zip, city, country},
      {new: true}
    )
    if (!user) res.status(404).json({message: 'Category can not be updated'})
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteUser = async (req, res) => {
  try {
    User.findByIdAndDelete(req.params.id).then(user => {
      if (user) {
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

module.exports = {getUsers, getUser, getUsersCount, makeUser, updateUser, deleteUser}
