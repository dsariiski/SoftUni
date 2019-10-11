const middlewareFunctions = require("./middleware")
const jwt = require("jsonwebtoken")
const tokenSecret = "randomSecret123"

module.exports = {
    validateUrl: (url) => {
        url = url.toLowerCase()
        
        return (url.startsWith("http://") || url.startsWith("https://"))
    },
    encodeToken: (token) => {
        try{
            return jwt.sign(token, tokenSecret)
        }catch(jwtError) {
            if(jwtError === "jwt must be provided"){
                return undefined
            }
            console.log("encoding went horribly wrong.")
        }
    },
    decodeToken: (token) => {
        if(!token){
            return undefined
        }
        try{
            return jwt.verify(token, tokenSecret)
        }catch(jwtError) {
            if(jwtError === "jwt must be provided"){
                return undefined
            }
            console.log("decoding went horribly wrong.")
        }
    },
    difficultyRender: (difficultyIndex) => {
        const difficulties = [
            {description: "1 - Very Easy"},
            {description: "2 - Easy"},
            {description: "3 - Medium"},
            {description: "4 - Intermediate"},
            {description: "5 - Expert"},
            {description: "6 - Hardcore"}
        ]

        difficulties[difficultyIndex-1].current = true

        let rezult = ""

        for(let difficulty in difficulties){
            if(difficulties[difficulty].current){
                rezult+= `<option value="${Number(difficulty)+1}" selected>${difficulties[difficulty].description}</option>`
            }else {
                rezult+= `<option value="${Number(difficulty)+1}">${difficulties[difficulty].description}</option>`
            }
        }

        return rezult
    }
}