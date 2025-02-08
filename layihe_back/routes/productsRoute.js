import express from "express";
import { addProduct, getAllProducts, getProducts } from "../controller/controller.js";

const router = express.Router()

router.route("/").get(getAllProducts).post(addProduct);
router.route("/category/:category").get(getProducts)

export default router