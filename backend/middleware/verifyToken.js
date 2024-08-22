const errorHandler = require("../utils/error")
const jwt = require("jsonwebtoken")

const isAuthenticate = async(req, res, next) =>{
    try {
        const token = req.cookies.access_token

        if(!token){
            return next(errorHandler(400, "Unauthorised"))
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) =>{
            if(err){
                return next(errorHandler(404, "Forbidden"))
            }

            req.user = user

            next()
        })

    } catch (error) {
        next(error)
    }
}

module.exports = isAuthenticate