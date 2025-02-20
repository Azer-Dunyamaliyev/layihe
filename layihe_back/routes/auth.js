import express from "express";
import {
  deleteUser,
  getAllUsers,
  meUser,
  updateEmail,
  updateName,
  updatePassword,
  updatePhone,
  updateSurName,
  updateUserAddress,
  updateUserInfo,
  updateUserName,
  updateUserTown,
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
router.put("/update/name", authMiddleware, updateName);
router.put("/update/surname", authMiddleware, updateSurName);
router.put("/update/address", authMiddleware, updateUserAddress);
router.put("/update/town", authMiddleware, updateUserTown);
router.put("/update/email", authMiddleware, updateEmail);
router.put("/update/password", authMiddleware, updatePassword);
router.put("/update/phone", authMiddleware, updatePhone);
router.put("/update", authMiddleware, updateUserInfo);
router.delete("/delete", authMiddleware, deleteUser);
export default router;
