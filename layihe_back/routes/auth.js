import express from "express";
import { getAllUsers, userLogin,userRegister } from "../controller/controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

export default router;
