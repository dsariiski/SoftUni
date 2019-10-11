let router = require('express').Router()
const controllers = require("../../controllers")
const middlewares = require('../../utilz/middleware')

router.get("/details/:id", controllers.cube.details)

router.get("/create", middlewares.isAuthenticated, controllers.cube.createGet)
router.post("/create", middlewares.isAuthenticated, controllers.cube.createPost)

router.get("/edit/:id", middlewares.isAuthenticated, middlewares.isAuthorized, controllers.cube.editGet)
router.post("/edit/:id", middlewares.isAuthenticated, middlewares.isAuthorized, controllers.cube.editPost)

router.get("/delete/:id", middlewares.isAuthenticated, middlewares.isAuthorized, controllers.cube.deleteGet)
router.post("/delete/:id", middlewares.isAuthenticated, middlewares.isAuthorized, controllers.cube.deletePost)

module.exports = app => {
    app.use("/cube", router)
}