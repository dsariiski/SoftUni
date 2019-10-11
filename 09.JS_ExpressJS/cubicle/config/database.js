const mongoose = require('mongoose')
mongoose.Promise = Promise

require('../models/Cube')
require('../models/Accessory')
require("../models/User")

module.exports = (connectionString) => {
    mongoose.connect(connectionString, { useNewUrlParser: true })
}