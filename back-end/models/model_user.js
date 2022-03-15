const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your Name!"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Please enter your Email!"],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please enter your Password!"],
    },
    role:{
        type: Number,
        default: 0 // 0 is user, 1 is admin    
    },
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/dmuwuu1sr/image/upload/v1641450687/Avatar/avatar-1577909_960_720_cdpvk5.png"    
    },
    youtube:{
        type: String,
        unique: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("user", user_schema)