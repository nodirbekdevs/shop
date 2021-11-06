const IsAdminUser = (req, res, next) => {
  // if (!req.user.isAdmin) return res.status(403).json({message: "It is not your level"})
  // next()
  !req.user.isAdmin ? res.status(403).json({message: "It is not your level"}) : next()
}

module.exports = IsAdminUser
