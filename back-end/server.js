require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())



// connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI || 'mongodb://127.0.0.1/videoServer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => { console.log('Connected to Mongo!'); }) 
.catch((err) => { console.error('Error connecting to Mongo', err); });


// routes
app.use('/user', require('./routes/router_user'))
app.use('/post', require('./routes/router_post'))

app.use('/api/upload', require('./routes/router_upload'))
app.use('/api/videoList', require('./routes/router_video'));
app.use('/api/videos', express.static('media/uploads'));



const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

