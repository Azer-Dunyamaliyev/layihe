import express from "express";
import {
  addProduct,
  getAllProducts,
  getProducts,
} from "../controller/controller.js";

const router = express.Router();

router.route("/:name").get(getAllProducts).post(addProduct);
router.route("/:name/:category").get(getProducts);
router.route("/:name/:category/:subcategory").get(getProducts);
export default router;
