const mongoose = require('mongoose')

const comment_schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    tag: Object,
    reply: mongoose.Types.ObjectId,
    
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('comment', comment_schema)