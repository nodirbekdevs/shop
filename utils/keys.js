const bcrypt = require('bcryptjs')
const passport = require('passport')

const PORT = 3000
const api_url = '/api'
const mongo_url = 'mongodb://localhost/market'
const mongo_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const salt = bcrypt.genSaltSync(10)
const secret_jwt = 'dev-jwt'
const IsAuthenticated = passport.authenticate('jwt', {session: false})


module.exports = {PORT, api_url, mongo_url, mongo_options, salt, secret_jwt, IsAuthenticated}
