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
            res.status(404).json({msg: err.message})
        }
    }


}

module.exports = post_controller