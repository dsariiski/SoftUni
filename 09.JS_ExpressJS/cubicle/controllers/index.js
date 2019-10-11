const homeController = require('./home')
const aboutController = require('./about')
const cubeController = require('./cube')
const accessoryController = require("./accessory")
const searchController = require('./search')
const userController = require("./user")
const errorController = require('./error')

module.exports = {
    home: homeController,
    about: aboutController,
    cube: cubeController,
    accessory: accessoryController,
    error: errorController,
    search: searchController,
    user: userController
}