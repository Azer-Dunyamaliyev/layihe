import express from "express";
import { getAllUsers, meUser, updateEmail, updatePassword, updateUserName, userLogin,userRegister } from "../controller/controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/me", authMiddleware, meUser);
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.put("/update/username",authMiddleware,updateUserName);
router.put("/update/email",authMiddleware,updateEmail);
router.put("/update/password", authMiddleware, updatePassword);
export default router;
