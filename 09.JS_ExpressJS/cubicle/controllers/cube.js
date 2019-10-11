const mongoose = require('mongoose')
const Cube = mongoose.model("Cube")
const Accessory = mongoose.model("Accessory")
const app = require("../config/express")()

module.exports.createGet = (req, res) => {
    res.render("createCube")
    app.locals.error = ""
}

module.exports.createPost = (req, res) => {
    const paramz = req.body
    paramz.accessories = []

    Cube.create(paramz).then(cubeDetails => {
        res.redirect("/")
    }).catch(err => {
        if (err) {
            console.warn(err)
            res.redirect('404')
        }
    })
}

module.exports.details = (req, res) => {
    const id = req.params.id

    Cube.findById(id).populate('accessories').then(cube => {
        app.locals.error = ""
        res.render("details", cube)
    }).catch(err => {
        if (err) {
            console.warn(err)
            res.redirect("404")
            return
        }
    })
}

module.exports.editGet = (req, res) => {
    const id = req.params.id

    res.locals.id = id
    res.locals.page = "editCube"

    renderEditDeletePage(req, res)
}

module.exports.editPost = (req, res) => {
    const id = req.params.id

    let cubeBody = req.body

    Cube.findById(id).then(cube => {
        if(!cubeBody.imageUrl){
            cubeBody.imageUrl = cube.imageUrl
        } else {
            cube.imageUrl = cubeBody.imageUrl
        }

        cube.name = cubeBody.name
        cube.difficultyLevel = cubeBody.difficultyLevel

        cube.save((err) => {
            if(err){
                console.warn(err)
                return
            }

            res.redirect(`/cube/details/${id}`)
        })

    }).catch(err => {
        console.warn(err)
    })
}

module.exports.deleteGet = (req, res) => {
    const id = req.params.id

    res.locals.id = id
    res.locals.page = "deleteCube"

    renderEditDeletePage(req, res)
}

module.exports.deletePost = (req, res) => {
    const id = req.params.id

    Cube.findByIdAndRemove(id).then(
        res.redirect("/")
    )

}

function renderEditDeletePage(req, res) {
    Cube.findOne({ _id: res.locals.id, creator: req.cookies.userToken.id }).populate("accessories").then(cube => {
        if (cube === null) {
            app.locals.error = "You don't have the required permissions to access this page."
            return res.redirect("/")
        }

        res.locals.cube = cube
        res.render(`${res.locals.page}`)
    }).catch(err => {
        if (err) {
            console.warn(err)
            res.redirect("404")
        }
    })
}
