const mongoose = require('mongoose')

const post_schema = mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    message: {        
        type: String,
        required: true,},
    creator: String,
    userId: String,
    tags: [String],
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
    images: {
        type: Array,
        require: true,
    },
    likes:[{type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    comments:[{type: mongoose.Types.ObjectId,
        ref: 'comment'
    }]
},{
        timestamps: true 
});

module.exports = mongoose.model("PostMessage", post_schema )