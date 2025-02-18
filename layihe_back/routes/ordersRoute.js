import express from "express"
import { createOrder, deleteAllOrders, deleteOrder, getOrderById, getUserOrders } from "../controller/controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router()

router.post("/", authMiddleware ,createOrder);
router.route("/:userId").get(authMiddleware,getUserOrders);
router.route("/order/:orderId").get(authMiddleware,getOrderById);
router.route("/order/:orderId").delete(authMiddleware,deleteOrder);
router.route("/delete").delete(authMiddleware,deleteAllOrders);
export default router   