import express from "express";
import authMiddleware from "../middleware/auth.js";
import { successOrders } from "../controller/controller.js";

export const router = express.Router()

router.route('/orders').post(authMiddleware,successOrders)

export default router