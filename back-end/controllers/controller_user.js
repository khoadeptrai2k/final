const Users = require('../models/model_user')

const user_controller = {
    register: async (req, res) => {
        try{
            res.json({msg: "Register"})
        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = user_controller