const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
var multer = require('multer');
const authRouter = require('./controllers/auth')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => console.log('DB is successfully connected'))

// middlewares and routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authRouter)
app.use('/blog', blogRouter)
app.use('/user', userRouter)
app.use('/images', express.static('public/images'))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.filename) //Appending extension
  }
})
var upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async(req, res) => {
    return res.status(200).json({msg: "Successfully uploaded"})
})


app.listen(5000, () => console.log("Server is connected successfully"))