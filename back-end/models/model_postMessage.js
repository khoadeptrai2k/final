const mongoose = require('mongoose')

const post_schema = mongoose.Schema({
    
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },

});

module.exports = mongoose.model("PostMessage", post_schema )