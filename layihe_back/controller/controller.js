import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import productsModel from "../models/productsModel.js";
import wishListModel from "../models/wishlistModel.js";
import mongoose from "mongoose";
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

// CATEGORY GORE
const getProducts = async (req, res) => {
  try {
    const { name, category, subcategory } = req.params;

    const filter = {};
    if (name) filter.name = name;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const products = await productsModel.find(filter);

    res.json(products);
  } catch (error) {
    console.error("Ürünleri getirme hatası:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { name } = req.params; // URL'den name parametresini al

    const filter = {};
    if (name) filter.name = name; // Eğer name parametresi varsa filtreye ekle

    const products = await productsModel.find(filter);

    if (products.length === 0) {
      return res.status(404).json({ message: "Hiç ürün bulunamadı" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// ALL FAVORI PRODUCTS
const getWishList = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await wishListModel.find({ userId }).populate("productId");

    if (favorites.length === 0) {
      return res.status(404).json({ message: "No favorite products found" });
    }

    res.json(favorites);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const wishlistStatus = async (req, res) => {
  try {
    // Kullanıcı ID'sini doğru şekilde almak
    const userId = req.user.userId; // userId'nin doğru şekilde tanımlandığını ve auth middleware'den geldiğini kontrol et
    const { productId } = req.params;

    console.log(`Checking wishlist status for user: ${userId}, product: ${productId}`);

    // MongoDB'nin ObjectId tipini kullanarak productId'yi dönüştür
    const objectId = new mongoose.Types.ObjectId(productId);

    // Kullanıcıya ait wishlist içinde bu ürün var mı kontrol et
    const isFavorite = await wishListModel.findOne({ userId, productId: objectId });

    console.log(`Product ${productId} is favorite: ${!!isFavorite}`); // Boolean olarak dönmesini sağla

    // Boolean değeri döndür
    return res.status(200).json({ isFavorite: !!isFavorite }); 
  } catch (error) {
    console.error("Wishlist status error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





//POST

const userRegister = async (req, res) => {
  try {
    const { username, email, password, phone, countryCode } = req.body;

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
    user = new userModel({
      username,
      email,
      password: hashedPassword,
      phone,
      countryCode,
    });
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

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      subcategory,
      description,
      defaultColor,
      variants,
      images,
      sizes,
    } = req.body;

    if (!name || !price || !category || !description) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm zorunlu alanları doldurun!" });
    }

    if (
      (!variants || variants.length === 0) &&
      (!images || images.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "Varyant veya en az 1 görsel gereklidir!" });
    }

    if (variants && variants.length > 0 && !defaultColor) {
      return res
        .status(400)
        .json({ message: "Varyantlı ürünlerde defaultColor zorunludur!" });
    }

    const newProduct = new productsModel({
      name,
      price,
      category,
      subcategory,
      description,
      defaultColor,
      variants: variants || [],
      images: images || [],
      sizes: sizes || [],
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Ürün başarıyla eklendi!", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const existingFavorite = await wishListModel.findOne({ userId, productId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    const newFavorite = new wishListModel({ userId, productId });
    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
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

const updatePhone = async (req, res) => {
  console.log("📥 Gelen veri:", req.body); // Test için

  const { phone, countryCode } = req.body;
  const userId = req.user.userId;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { phone, countryCode }, // 🔥 Güncellenen değerler
      { new: true } // Güncellenmiş datayı döndür
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Güncellenmiş Kullanıcı:", updatedUser); // Backend'de güncellendi mi kontrol edelim

    res.status(200).json({
      message: "Phone updated successfully!",
      phone: updatedUser.phone,
      countryCode: updatedUser.countryCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//DELETE

const deleteUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteWishListItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;
    const deletedFavorite = await wishListModel.findOneAndDelete({ userId, productId });

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favori ürün bulunamadı!" });
    }

    res.status(200).json({ message: "Favori ürün başarıyla silindi!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Sunucu hatası", error });
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
  updatePhone,
  deleteUser,
  getProducts,
  getAllProducts,
  addProduct,
  getWishList,
  addWishlist,
  deleteWishListItem,
  wishlistStatus,
};
