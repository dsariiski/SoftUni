const userControllers = require("../../controllers/user")
const router = require('express').Router()
const middlewares = require("../../utilz/middleware.js")

module.exports = (app) => {
    router.get("/login", middlewares.isAnonymous, userControllers.loginGet)
    router.post("/login", middlewares.isAnonymous, userControllers.loginPost)

    router.get("/register", middlewares.isAnonymous, userControllers.registerGet)
    router.post("/register", middlewares.isAnonymous, userControllers.registerPost)

    router.get("/logout", middlewares.isAuthenticated, userControllers.logout)

    app.use("/user", router)
}