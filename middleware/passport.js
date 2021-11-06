const passportJwt = require('passport-jwt')
const User = require('./../models/userModel')
const {secret_jwt} = require('./../utils/keys')

const Strategy = passportJwt.Strategy
const Extract = passportJwt.ExtractJwt

const options = {
  jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_jwt
}

module.exports = passport => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('username id')
        user ? done(null, user) : done(null, false)
      } catch (e) {
        console.log(e)
      }
    })
  )
}
