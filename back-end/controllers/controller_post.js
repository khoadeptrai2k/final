const PostMessage = require('../models/model_postMessage')


const post_controller = {

    getPosts: async (req, res) => {
        try {
            const postMessages = await PostMessage.find(
                req.user._id
            ).sort('-createdAt').populate("user likes","avatar name");
            res.status(200).json(postMessages);
        } catch (err) {
            res.status(404).json({msg: err.message});
        }
    },
    getPost: async (req, res) => {
        try{
            const {id} = req.params;
            const post = await PostMessage.findById(id);
        
            res.status(200).json(post)
        } catch (err) {
            res.status(400).json({msg: err.message})
        }
    },
    createPost: async(req, res) =>{
        try{
            const post = req.body
            const newPostMessage = new PostMessage({...post, creator:req.user.name, userId:req.user.id})
            
            await newPostMessage.save();

            res.status(200).json(newPostMessage);
        } catch (err){
            res.status(400).json({msg: err.message});
        }
    },
    updatePost: async(req, res) =>{
        try
        {
            const ObjectId = require('mongoose').Types.ObjectId
            const { id } = req.params;
            const { title, message, creator, selectedFile, tags } = req.body;
        
            if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
            const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    
            await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
            res.json(updatedPost);
        } catch(err){
            res.status(400).json({msg: err.message});
        }
    },
    deletePost: async(req, res) =>{
        try {
            const ObjectId = require('mongoose').Types.ObjectId
            const { id } = req.params;
            if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

            await PostMessage.findByIdAndRemove(id);
            
            res.json({ message: "Post deleted successfully." });
        } catch (err) {
            res.status(400).json({msg: err.message});
        }
    },
    likePost: async(req, res) =>{
        try {
            const ObjectId = require('mongoose').Types.ObjectId
            const { id } = req.params;
            
            if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

            const post = await PostMessage.findById(id)

            const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true});

            res.json(updatePost);
        } catch (err) {
            res.status(400).json({msg: err.message})
        }
    }


}

module.exports = post_controller