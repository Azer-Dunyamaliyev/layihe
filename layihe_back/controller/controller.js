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

const userRegister = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Useri yoxla
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "This email is already registered!" });
        }

        // Şifreyi şifrele
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Yeni User yarat
        user = new userModel({ username, email, password: hashedPassword, phone });
        await user.save();

        // Başarıyla mesaj
        res.status(201).json({ success: true, message: "New user created!" });

    } catch (error) {
        console.error("Backend hata:", error);
        res.status(500).json({ success: false, message: "Server error.." });
    }
};


const userLogin = async (req,res) => {
    try {
        
        const { email,password } = req.body
    
        // USER YOXLANISI
        const user = await userModel.findOne({ email })
        if(!user) return res.status(400).json({ success: false, message: "Wrong information" })
    
        //PASSWORD YOXLANILMASI
        const isMatch = await bcrypt.compare(password,user.password) 
        if(!isMatch) return res.status(400).json({ success: false, message: "Wrong information" })

        //TOKEN YARATMAQ
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '7d'})

        // Token'ı Cookie'ye qoyuruq
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.json({token,userId: user._id,username: user.username})

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error.." })
    }
}

export {userRegister,userLogin,getAllUsers}