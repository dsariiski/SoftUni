const mongoose = require("mongoose")

const userSchema = {
    username: {type: mongoose.Schema.Types.String, required: true},
    password: {type: mongoose.Schema.Types.String, required: true},
    salt: {type: mongoose.Schema.Types.String, required: true},
    cubes: [{type: mongoose.Schema.Types.ObjectId, ref: "Cube"}],
    accessories: [{type: mongoose.Schema.Types.ObjectId, ref: "Accessory"}]
}

module.exports = mongoose.model("User", userSchema)