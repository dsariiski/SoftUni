const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path')
const cookieParser = require('cookie-parser')
const utilz = require("../utilz/utilz")

module.exports = (app) => {
    if (!app) {
        return this.app
    }

    this.app = app

    app.engine("hbs", handlebars({
        extname: ".hbs",
        helpers: {
            difficultyRender: utilz.difficultyRender
        }
    }))

    app.set('view engine', '.hbs')
    app.set("views", path.normalize(path.join(__dirname, "../views")))

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use(express.static("static"))

    app.use(cookieParser())

    require("./routes/index")(app)
};