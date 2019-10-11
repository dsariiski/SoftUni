isAuthenticatedSession = (req, res, next) => {
    //declaring here to make sure 
    //the express app is defined and set up
    const app = require("../config/express")()

    if (req.session.user) {
        next()
        return
    }

    app.locals.error = "You do not have the required permissions."
    return res.redirect("/user/login")
}

isAuthenticated = (req, res, next) => {
    const app = require("../config/express")()
    const utilz = require("../utilz/utilz")
    app.locals.error = "You do not have the required permissions."
    const token = req.cookies.userToken

    if (token) {
        let decodedToken = false
        try {
            decodedToken = utilz.decodeToken(token)
        } catch (jwtError) {
            console.warn("token error")

            res.clearCookie("userToken")
            delete app.locals.user
            res.redirect("/")
        }
        if (decodedToken) {
            app.locals.error = ""
            req.cookies.userToken = decodedToken
            return next()
        }
        app.locals.error = "Log in to complete this operation."

        return
    }

    res.cookie("origin", req.originalUrl)

    if (req.originalUrl === "/user/logout") {
        res.cookie("origin", "/")
    }

    return res.redirect("/user/login")
}

isAnonymous = (req, res, next) => {
    const utilz = require("../utilz/utilz")
    const token = req.cookies.userToken

    const result = utilz.decodeToken(token)

    if (result) {
        return res.redirect("/")
    }

    return next()
}

isAuthorized = (req, res, next) => {
    const userId = req.cookies.userToken.id
    const Cube = require("../models/Cube")
    const app = require("../config/express")()

    Cube.findById(req.params.id).then(cube => {
        if (cube.creator.toString() !== userId) {
            app.locals.error = "You do not have the required permissions to complete this operation."
            return res.redirect("/")
        }

        next()
    }).catch(err => {
        if (err) {
            console.warn(err)
        }
    })

}

const middlewares = {
    isAuthenticated,
    isAnonymous,
    isAuthorized
}

module.exports = middlewares