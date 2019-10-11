const mongoose = require('mongoose')
const utilz = require('../utilz/utilz')

const accessorySchema = {
    name: {type: mongoose.Schema.Types.String, required: true},
    imageUrl: {type: mongoose.Schema.Types.String, validate: [utilz.validateUrl, "Invalid url!"]},
    description: {type: mongoose.Schema.Types.String, maxLength: 21},
    cubes: [{type: mongoose.Schema.Types.ObjectId, ref: "Cube"}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}

module.exports = mongoose.model("Accessory", accessorySchema)