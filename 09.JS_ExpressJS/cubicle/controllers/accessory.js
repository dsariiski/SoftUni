const mongoose = require('mongoose')
const Cube = mongoose.model('Cube')
const Accessory = mongoose.model('Accessory')

module.exports.accessoryGet = (req, res) => {
    res.render("createAccessory")
}

module.exports.accessoryPost = (req, res) => {
    const accessoryDetails = req.body

    Accessory.create(accessoryDetails).then(accessory => {
        console.log("created...")
        res.redirect("/")
    }).catch(err => {
        if (err) {
            console.warn(err)
            res.redirect('404')
        }
    })
}

module.exports.attachGet = (req, res) => {
    const paramz = req.params
    const cubeId = paramz.id

    Cube.findById(cubeId).then(cube => {
        Accessory.find({})
            .where("_id")
            .nin(cube.accessories)
            .then(accessories => {
                res.render('attachAccessory', { accessories, cube })
            })
            .catch(err => {
                if (err) {
                    console.warn(err)
                    res.redirect("404")
                    return
                }
            })
    })
        .catch(err => {
            if (err) {
                console.warn(err)
                res.redirect("404")
                return
            }
        })
}

module.exports.attachPost = (req, res) => {
    const cubeId = req.params.id
    const accessoryId = req.body.accessory

    Accessory.findById(accessoryId)
        .then(accessory => {
            accessory.cubes.push(cubeId)
            accessory.save()

            Cube.findById(cubeId)
                .then(cube => {
                    cube.accessories.push(accessoryId)
                    cube.save()

                    res.redirect(`/details/${cubeId}`)
                })
                .catch(err => {
                    if (err) {
                        console.warn(err)
                        res.redirect("404")
                        return
                    }
                })
        }).catch(err => {
            if (err) {
                console.warn(err)
                res.redirect('404')
                return
            }
        })

}