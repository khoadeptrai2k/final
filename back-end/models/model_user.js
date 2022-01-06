const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your Name!"],
        trim: true
    },
    account:{
        type: String,
        required: [true, "Please enter your Account!"],
        trim: true,
        unique: true
    },
    password:{
        type: Number,
        required: [true, "Please enter your Password!"],
    },
    role:{
        type: String,
        default: 0 // 0 is user, 1 is admin    
    },
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/dmuwuu1sr/image/upload/v1641450687/Avatar/avatar-1577909_960_720_cdpvk5.png"    
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("Users", user_schema)