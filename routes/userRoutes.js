const express = require('express')
const {getUsers, getUser, getUsersCount, makeUser, updateUser, deleteUser} = require('./../views/userViews')
const IsAdminUser = require('./../middleware/admin')

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/count', getUsersCount)
router.post('/create', makeUser)
router.put('/edit/:id', updateUser)
router.delete('/delete/:id', IsAdminUser, deleteUser)

module.exports = router
