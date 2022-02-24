const mongoose = require('mongoose')

const post_schema = mongoose.Schema({
    
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: new Date()
    }

});

module.exports = mongoose.model("PostMessage", post_schema )