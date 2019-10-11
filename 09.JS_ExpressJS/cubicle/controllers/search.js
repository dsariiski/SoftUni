const Cube = require('../models/Cube')

module.exports = (req, res) => {
    const searchBody = req.body
    searchBody.from = parseInt(searchBody.from)
    searchBody.to = parseInt(searchBody.to)
    const from = Math.min(searchBody.from, searchBody.to)
    const to = Math.max(searchBody.from, searchBody.to)

    Cube.where('difficultyLevel').gte(from).lte(to).then(cubes => {
        res.render("index", { cubes, from, to })
    }).catch(err => {
        if (err) {
            console.warn(err)
            res.redirect("404")
        }
    })

}