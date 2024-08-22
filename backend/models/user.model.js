// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 6,
//     },
//     gender: {
//         type: String,
//         required: true,
//         enum: ["male", "female"],
//     },
//     profilePic: {
//         type: String,
//         default: "",
//     },
//     // token: {
//     //     type: String, // Changed from true to String
//     // },
// }, { timestamps: true });

// const Users = mongoose.model("User", userSchema);

// module.exports = Users;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Removed unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
        default: "",
    },
    // Uncomment if needed
    // token: {
    //     type: String,
    // },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
