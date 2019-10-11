const bcrypt = require('bcrypt')
const saltRounds = 8

let exporter = {
    generateSalt: () => {
        return bcrypt.genSaltSync(saltRounds)
    },
    generateHashedPassword: (plainPassword, salt) => {
        return bcrypt.hashSync(plainPassword, salt)
    }
}

module.exports = exporter