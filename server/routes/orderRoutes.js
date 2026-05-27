// server/routes/orderRoutes.js

const express = require("express");

const router = express.Router();

const {

  placeOrder,

  getBuyerOrders,

  getFarmerOrders,

  completeOrder,

  getFarmerDashboard,

} = require(
  "../controllers/orderController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/* =========================
   PLACE ORDER
========================= */

router.post(
  "/",
  protect,
  placeOrder
);

/* =========================
   BUYER ORDERS
========================= */

router.get(
  "/buyer",
  protect,
  getBuyerOrders
);

/* =========================
   FARMER ORDERS
========================= */

router.get(
  "/farmer",
  protect,
  getFarmerOrders
);

/* =========================
   FARMER DASHBOARD
========================= */

router.get(
  "/dashboard",
  protect,
  getFarmerDashboard
);

/* =========================
   COMPLETE ORDER
========================= */

router.put(
  "/:id",
  protect,
  completeOrder
);

module.exports = router;