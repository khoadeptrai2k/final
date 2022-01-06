const Users = require('../models/model_user')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const sendMail = require('./send_mail')

const {CLIENT_URL} = process.env

const user_controller = {
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
                name, email, password: password_hash        
            }

            const activation_token = createActivationToken(user_new)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "verify your email address")


            res.json({msg: "Register Success! Please activate Email to Start!"})
        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    activateEmail : async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jsonwebtoken.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {name, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"Email already exist!"})
            
            const newUser = new Users({
                name, email, password
            })

            await newUser.save()

            res.json({msg:"Account has been activated!"})


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
    return jsonwebtoken.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '15m'})
}

const createAccessToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}


module.exports = user_controller