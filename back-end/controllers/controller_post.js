const PostMessage = require('../models/model_postMessage')

const post_controller = {

    getPosts: async (req, res) => {
        try {
            const postMessages = await PostMessage.find();
            
            res.status(200).json(postMessages);
        } catch (err) {
            res.status(404).json({msg: err.message});
        }
    },
    getPost: async (req, res) => {
        const {id} = req.params;
        try{
            const post = await PostMessage.findById(id);

            res.status(200).json(post)
        } catch (err) {
            res.status(400).json({msg: err.message})
        }
    },
    createPost: async(req, res) =>{
        const { title, message, selectedFile, creator, tags} = req.body
        
        const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags})
        
        try{
            await newPostMessage.save();

            res.status(200).json(newPostMessage);
        } catch (err){
            res.status(400).json({msg: err.message});
        }
    },
    


}

module.exports = post_controller