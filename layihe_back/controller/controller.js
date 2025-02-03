import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GET
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json("Server xetasi");
    }
};

//POST

const userRegister = async (req,res) => {
    try {
        const { username,email,password } = req.body

        // USER YOXLANILMASI
        let user = await userModel.findOne({ email })
        if (user) return res.status(400).json("Bu email zaten qeydiyatlidir!")
        
        // PASSWORD SIFRELEME
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // YENI USER YARATMAQ
        user = new userModel({ username,email,password: hashedPassword })
        await user.save();
        res.status(201).json('Yeni user yaradildi!')
    } catch (error) {
        res.status(500).json('Server xetasi..')
    }
}

const userLogin = async (req,res) => {
    try {

        const { email,password } = req.body
    
        // USER YOXLANISI
        const user = await userModel.findOne({ email })
        if(!user) return res.status(400).json('Yanlis melumat')
    
        //PASSWORD YOXLANILMASI
        const isMatch = await bcrypt.compare(password,user.password) 
        if(!isMatch) return res.status(400).json('Yanlis melumat')

        //TOKEN YARATMAQ
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '7d'})

        // Token'ı Cookie'ye qoyuruq
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.json({token,userId: user._id})

    } catch (error) {
        res.status(500).json('Server xetasi')
    }
}

export {userRegister,userLogin,getAllUsers}