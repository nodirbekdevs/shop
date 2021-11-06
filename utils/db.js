const mongoose = require('mongoose')
const {mongo_url, mongo_options} = require('./keys')

const db = mongoose.connect(mongo_url, mongo_options)
  .then(() => {
    console.log('To MongoDb has connected ...')
  })
  .catch((err) => {
    console.log(`To MongoDb has not connected and problem has kept ${err}`)
  })


module.exports = db
