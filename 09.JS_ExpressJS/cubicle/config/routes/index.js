const usersRouter = require('./user')
const cubeRouter = require("./cube")
const accessoryRouter = require("./accessory")
const other = require("./other")

module.exports = (app) => {
    usersRouter(app)
    cubeRouter(app)
    accessoryRouter(app)
    other(app)
}