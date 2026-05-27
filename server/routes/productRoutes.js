const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
} = require(
  "../controllers/productController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

/* ALL PRODUCTS */

router.get("/", getProducts);

/* FARMER PRODUCTS */

router.get(
  "/my-products",
  protect,
  getMyProducts
);

/* ADD PRODUCT */

router.post(
  "/",
  protect,
  addProduct
);

// UPDATE PRODUCT
router.put("/:id", protect, updateProduct);

// DELETE PRODUCT
router.delete("/:id", protect, deleteProduct);
module.exports = router;

