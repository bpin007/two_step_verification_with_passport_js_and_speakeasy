import express, { json, urlencoded } from 'express'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import dbConnect from './configs/dbConnect.js'
import route from './routes/authRoutes.js'
import './configs/passportConfig.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 7002

dbConnect()

//middleware
const corsOptions = {
    origin: ['http://localhost:7777'],
    credentials: true
}
app.use(cors(corsOptions))
app.use(json({ limit: "100mb" }))
app.use(urlencoded({ limit: "100mb", extended: true }))
app.use(session({
    secret: process.env.SCERECT_SESSION || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    }
})) //Creates session IDs and Manages cookies and Stores data in server memory

app.use(passport.initialize()) //Prepares Passport to work with Express
app.use(passport.session()) //Automatically calls deserializeUser and Populates req.user on every request and Makes req.isAuthenticated() work

//Routes
app.use('/api/auth',route)

app.get('/api/auth',(req,res)=>{
res.status(200).json({message:"welcome to two step verification api service"})
})

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`)
})