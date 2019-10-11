const controllers = require("../../controllers")

module.exports = (app) => {

    app.get("/", controllers.home)

    app.get("/about", controllers.about)
    app.post("/search", controllers.search)

    app.get("*", controllers.error)
}