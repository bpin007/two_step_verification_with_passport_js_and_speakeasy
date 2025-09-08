import { Router } from "express";
import passport from "passport";
import { resgister,login, authStatus, logout, setup2FA, verify2FA, reset2FA } from "../controllers/authController.js";

const route = Router()

//Registration route
route.post('/register',resgister)

//Login route
route.post('/login', passport.authenticate('local'),login)

//Auth status route
route.get('/status', authStatus)

//Logout Route
route.post('/logout', logout)


//2FA setup
route.post('/2fa/setup',(req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.status(401).json({message:"Unauthorized user"}) 
}, setup2FA)

//verify route
route.post('/2fa/verify',(req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.status(401).json({message:"Unauthorized user"}) 
}, verify2FA)

//Reset Route
route.post('/2fa/reset',(req,res,next)=>{
    if(req.isAuthenticated()) return next()
    res.status(401).json({message:"Unauthorized user"}) 
}, reset2FA)

export default route