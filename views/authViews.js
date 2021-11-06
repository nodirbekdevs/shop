const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const {salt, secret_jwt} = require('./../utils/keys')


const login = async (req, res) => {
  const {username, password} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign(
        {username: candidate.username, userId: candidate._id, isAdmin: candidate.isAdmin},
        secret_jwt,
        {expiresIn: 60 * 60}
      )
      res.status(200).json({token: `Bearer ${token}`})
    } else {
      res.status(401).json({message: 'Пароли не совпадают. Попробуйте снова'})
    }
  } else {
    res.status(404).json({message: 'Пользователь с таким email не найден'})
  }
}

const registerUser = async (req, res) => {
  const {name, email, username, password, phone, isAdmin, street, apartment, zip, city, country} = req.body
  const candidate = await User.findOne({username: username})
  if (candidate) {
    res.status(409).json({message: 'Такой email уже занят. Попробуйте другой'})
  } else {
    const user = new User(
      {name, email, username, password: bcrypt.hashSync(password, salt), phone, isAdmin, street, apartment, zip, city, country}
    )
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

const userProfile = async (req, res) => {
  try {
    const user = User.findById(req.user._id)
    if (!user) res.status(404).json('The user has not found')
    res.status(200).json(user)
  } catch (e) {
    res.status(404).json(e)
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const {name, email, password, phone, isAdmin, street, apartment, zip, city, country} = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {name, email, password: bcrypt.hashSync(password, salt), phone, isAdmin, street, apartment, zip, city, country},
      {new: true}
    )
    if (!user) res.status(404).json({message: 'Category can not be updated'})
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports = {login, registerUser, userProfile, updateUserProfile}
