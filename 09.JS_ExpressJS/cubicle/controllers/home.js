const mongoose = require("mongoose")
const Cube = mongoose.model("Cube")
const User = mongoose.model("User")
const app = require('../config/express')()

module.exports = (req, res) => {
    Cube.find({}).then(kubez => {
        res.locals.cubes = kubez
        res.render("index")
        app.locals.error = ""
    }).catch(err => {
        res.redirect("404")
        console.warn(err)
    })
}