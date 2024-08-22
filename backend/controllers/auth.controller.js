const User = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
    const { username, email, password, confirmPassword, gender } = req.body;

    let validUser
    validUser = await User.findOne({email})

    if(validUser){
        next(errorHandler(400, "User already exists"))
    }

    if(password !== confirmPassword){
        next(errorHandler(400, "Password don't match"))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        profilePic : gender == "male" ? boyProfilePic : girlProfilePic,
    });

    try {
        //generate jwt token
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
        await newUser.save()

        res.cookie("access_token", token, {httpOnly: true}).status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        next(error)
        
    }

    
};

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const validUser = await User.findOne({email})

        if(!validUser){
            return next(errorHandler(400, "User not found"))
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)

        if(!validPassword){
            return next(errorHandler(400, "Wrong credentials"))
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY)

        res.cookie("access_token", token, {httpOnly: true}).status(200).json({
            _id: validUser._id,
            username: validUser.username,
            email: validUser.email,
            profilePic: validUser.profilePic
        })
    } catch (error) {
        next(error)
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token")

        res.status(200).json({
            message: "User has been logged out successfully"
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    signup,
    login,
    logout
};
