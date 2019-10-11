const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const utilz = require("../utilz/utilz")

const cubeSchema = new Schema({
    name: { type: mongoose.Schema.Types.String, required: true},
    description: { type: mongoose.Schema.Types.String, max: 21 },
    imageUrl: { type: mongoose.Schema.Types.String, validate: [utilz.validateUrl, "Invalid url!"] },
    difficultyLevel: { type: mongoose.Schema.Types.Number, min: 1, max: 6 },
    accessories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Accessory'}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Cube", cubeSchema)