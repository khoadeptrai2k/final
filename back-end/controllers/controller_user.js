const Users = require('../models/model_user')
const Posts = require('../models/model_postMessage')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const sendMail = require('./send_mail')


const {CLIENT_URL} = process.env

const user_controller = {
    // register account with email
    register: async (req, res) => {
        try{
            const {name, email, password} = req.body
                
            if(!name || !email || !password)
                return res.status(400).json({msg: "Please don't blank all fields."})
            
            if(!validate_email(email))
                return res.status(400).json({msg: "Invalid Email!"})
            
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "Email already exist!"})

            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})
            
            const password_hash = await bcrypt.hash(password, 12)
        
            const user_new = {
                name, email, password: password_hash,        
            }

            const activation_token = createActivationToken(user_new)

            const url = `${CLIENT_URL}/api/activate/${activation_token}`
            sendMail(email, url, "verify your email address")


            res.json({msg: "Register Success! Please activate Email to Start!"})
        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    // activate email 
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jsonwebtoken.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            const {name, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"Email already exist!"})
            
            const newUser = new Users({
                name, email, password
            })
            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            await newUser.save()

            res.json({msg:"Account has been activated!", access_token, user: {...user._doc},password:""})


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // login
    login: async (req, res) => {
        try{
            const {email, password} = req.body
            const user = await Users.findOne({email})
            
            if(!user) return res.status(500).json({msg: "This email doesn't exists"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(500).json({msg:"Password is incorrect!"})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login successfully!", access_token, user: {...user._doc}})

        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // accesstoken
    getAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(500).json({msg:"Please login now!"})

            jsonwebtoken.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) =>{
                if(err) return res.status(500).json({msg: "Please login now!"})

                const user = await Users.findById(result.id).select("-password")
                if (!user) return res.status(400).json({ msg: "User is not exist" });

                const access_token = createAccessToken({id: result.id})
                res.json({access_token, user})
            })
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // forgot pass
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(500).json({msg: "This email doesn't exist"})
            
            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/api/reset/${access_token}`
            sendMail(email, url, "Reset your password")
            res.json({msg: "Re-send reset pass, please check your email."})
        
        
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) =>{
        try{
            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            console.log(req.user)
            await Users.findOneAndUpdate({_id: req.user.id},{
                password: passwordHash
            })
            
            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist !"})

            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    searchUser: async (req, res) => {
        try {
            const user = await Users.find({name: {$regex: req.query.name}})
            .limit(10).select("name avatar")
            
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Logged Out!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { avatar, name, mobile, address, something, gender } = req.body
            if(!name) return res.status(400).json({msg: "Please add your name."})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                avatar, name, mobile, address, something, gender
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id) 


            res.json({msg: "Delete Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
 
function validate_email(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '7d'})
}

const createAccessToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}

const createRefreshToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


module.exports = user_controller


