import userModel from "../models/userModel.js";
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

const meUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//POST

const userRegister = async (req, res) => {
  try {
    const { username, email, password, phone, gender } = req.body;

    // Useri yoxla
    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already registered!" });
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

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // USER YOXLANISI
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Wrong information" });

    //PASSWORD YOXLANILMASI
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Wrong information" });

    //TOKEN YARATMAQ
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Token'ı Cookie'ye qoyuruq
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error.." });
  }
};

//PUT

const updateUserName = async (req, res) => {
  const { username } = req.body;
  const userId = req.user.userId;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateEmail = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.user.userId;

  try {
    const user = await userModel.findById(userId);

    // Kullanıcı mevcut ve şifreyi doğrula
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        user.email = email;
        await user.save();

        res.status(200).json({ message: "Email updated successfully!" });
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log("Received oldPassword:", oldPassword);
  console.log("Received newPassword:", newPassword);

  const userId = req.user.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
};
  

export {
  userRegister,
  userLogin,
  getAllUsers,
  meUser,
  updateUserName,
  updateEmail,
  updatePassword,
};
