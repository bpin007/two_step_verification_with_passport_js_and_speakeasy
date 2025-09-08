import bcrypt from 'bcrypt'
import User from '../models/user.js'
import speakeasy from 'speakeasy'
import qrCode from 'qrcode'
import jwt from 'jsonwebtoken'

export const resgister = async (req, res) => {

    try {
        const { username, password } = req.body
        const hasPassword = await bcrypt.hash(password, 10)
        const newUSer = new User({
            username,
            password: hasPassword,
            isFMAActive: false
        })

        await newUSer.save()

        res.status(201).json({ message: "User created successfully", success: true, data:username })

        console.log(newUSer, "newUSer")

    } catch (error) {
        res.status(500).json({ error: "Error registering User", message: error })
    }
}
export const login = (req, res) => {
   if (req.user) {
        res.status(200).json({
            message: "User loggedIn successfully",
            username: req.user.username,
            isFMAActive: req.user.isFMAActive
        })
    } else return res.status(401).json({ message: "Unauthorized user",success:fal })
}
export const authStatus = (req, res) => {
    if (req.user) {
        res.status(200).json({
            message: "User loggedIn successfully",
            username: req.user.username,
            isFMAActive: req.user.isFMAActive
        })
    } else return res.status(401).json({ message: "Unauthorized user" })
}
export const logout = (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized user" })
    req.logout((err) => {
        if (err) return res.status(400).json({ message: "User not loggedIn" })
        res.status(200).json({ message: "Logout successfull" })
    })
}
export const setup2FA = async (req, res) => {
    try {
        console.log(`The req.user is, ${req.user}`)
        const user = req.user
        var secret = speakeasy.generateSecret();
        console.log(`this is speakeasy secret vaku ${secret.base32}`)
        user.twoFactorSecret = secret.base32
        user.isFMAActive = true
        await user.save()
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user.username}`,
            issuer: "https://developerbipin.netlify.app/",
            encoding: "base32"
        })
        const qrcodeImageUrl = await qrCode.toDataURL(url)
        res.status(200).json({ secret: secret.base32, qrCode: qrcodeImageUrl, message: "2FA is setup is done" })

    } catch (error) {
        res.status(500).json({ error: "Error setingup 2FA", message: error })
    }
}
export const verify2FA = async (req, res) => {

    const { token } = req.body
    const user = req.user

    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token
    })

    if (verified) {
        const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1hr" })
        res.status(200).json({ message: "2FA successful", token: jwtToken })
    } else {
        res.status(400).json({ message: "Invaild 2FA token" })
    }


}
export const reset2FA = async (req, res) => {
    try {
        const user = req.user
        console.log(user,"userrrr")
        user.twoFactorSecret = ""
        user.isFMAActive = false
        await user.save()
        res.status(200).json({message:"2FA reset successfully"})

    } catch (error) {
        res.status(500).json({message:error,error:"error occured while reseting 2FA"})
    }
}