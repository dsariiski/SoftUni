let router = require('express').Router()
const controllers = require("../../controllers")
const middlewares = require("../../utilz/middleware")

router.get("/create", middlewares.isAuthenticated, controllers.accessory.accessoryGet)
router.post("/create", middlewares.isAuthenticated, controllers.accessory.accessoryPost)

router.get("/attach/:id", middlewares.isAuthenticated, middlewares.isAuthorized, controllers.accessory.attachGet)
router.post("/attach/:id", middlewares.isAuthenticated, middlewares.isAuthorized, controllers.accessory.attachPost)

module.exports = (app) => {
    app.use("/accessory", router)
}
