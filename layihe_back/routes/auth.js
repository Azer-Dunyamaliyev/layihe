import express from "express";
import {
  deleteUser,
  getAllUsers,
  meUser,
  updateEmail,
  updatePassword,
  updatePhone,
  updateUserName,
  userLogin,
  userRegister,
} from "../controller/controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/me", authMiddleware, meUser);
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.put("/update/username", authMiddleware, updateUserName);
router.put("/update/email", authMiddleware, updateEmail);
router.put("/update/password", authMiddleware, updatePassword);
router.put("/update/phone", authMiddleware, updatePhone);
router.delete("/delete", authMiddleware, deleteUser);

export default router;
