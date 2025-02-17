import express from "express"
import { createOrder, deleteOrder, getOrderById, getUserOrders, updateOrderStatus } from "../controller/controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router()

router.post("/", authMiddleware ,createOrder);
router.route("/:userId").get(authMiddleware,getUserOrders);
router.route("/order/:orderId").get(authMiddleware,getOrderById);
router.route("/order/:orderId").put(authMiddleware,updateOrderStatus);
router.route("/order/:orderId").delete(authMiddleware,deleteOrder);
export default router