const mongoose = require('mongoose')
const User = mongoose.model("User")
const auth = require('../config/auth')
const app = require("../config/express")()
const utilz = require("../utilz/utilz")


module.exports.loginGet = (req, res) => {
    res.render("loginPage")
    app.locals.error = ""
}

module.exports.loginPost = (req, res) => {
    app.locals.error = ""
    const credentials = req.body
    const origin = req.cookies.origin

    User.findOne({username: credentials.username})
    .then(user => {
        if(auth.generateHashedPassword(credentials.password, user.salt) === user.password){
            app.locals.error = ""
            
            const userPayload = {
                id: user._id,
                username: user.username
            }

            res.cookie("userToken", utilz.encodeToken(userPayload))            
            app.locals.user = {username: user.username}

            if(origin){
                res.clearCookie("origin")
                return res.redirect(`${origin}`)
            }

            return res.redirect("/")
        }
        app.locals.error = "Invalid credentials."
        return res.redirect("loginPage")
    }).catch(err => {
        if(err){
            console.warn(err)
        }
    })
}

module.exports.registerGet = (req, res) => {
    res.render("registerPage")
    app.locals.error = ""
}

module.exports.registerPost = (req, res) => {
    const credentials = req.body
    let user = {cubes: [],accessories: []}

    if (credentials.password === credentials.repeatPassword) {
        user.username = credentials.username
        user.salt = auth.generateSalt()
        user.password = auth.generateHashedPassword(credentials.password, user.salt)

        return User.create(user)
            .then(user => {
                app.locals.error = ""

                const userPayload = {
                    id: user._id,
                    username: user.username
                }

                res.cookie("userToken", utilz.encodeToken(userPayload))
                
                app.locals.user = {
                    username: user.username
                }
                res.redirect("/")
                console.log(`${user.username} created!`)
            }).catch(err => {
                if (err) {
                    console.log("user creation FAILED!")
                    console.warn(err)
                }
            })
    }

    res.redirect("404")
}

module.exports.logout = (req, res) => {
    /*
    req.session.destroy(err => {
        if(err){
            console.log("logout error:")
            return console.warn(err)
        }
        delete app.locals.user
        res.clearCookie("connect.sid")
        
        res.redirect("/")
    })
    */
    delete app.locals.user
    res.clearCookie("userToken")
    res.redirect("/")
}