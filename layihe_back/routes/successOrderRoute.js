import express from "express";
import authMiddleware from "../middleware/auth.js";
import { deleteOrder, successOrders, updateOrderStatus } from "../controller/controller.js";

export const router = express.Router()

router.route('/orders').post(authMiddleware,successOrders)
router.route("/order/:orderId").put(authMiddleware,updateOrderStatus);
router.route("/order/:orderId").delete(authMiddleware,deleteOrder);

export default router