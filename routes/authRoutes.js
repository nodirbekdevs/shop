const express = require('express')
const {login, registerUser, userProfile, updateUserProfile} = require('./../views/authViews')
const {IsAuthenticated} = require('./../utils/keys')

const router = express.Router()

router.get('/profile', IsAuthenticated, userProfile)
router.post('/login', login)
router.post('/register', registerUser)
router.put('/update/profile', updateUserProfile)

module.exports = router
