// server/models/Order.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(

  {

    /* BUYER */

    buyer: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    buyerName: {
      type: String,
      required: true,
    },

    /* FARMER */

    farmer: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmerName: {
      type: String,
      required: true,
    },

    /* PRODUCT */

    product: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
      default:
        "https://via.placeholder.com/300",
    },

    /* ORDER INFO */

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "kg",
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    /* DELIVERY */

    deliveryAddress: {
      type: String,
      required: true,
      default: "Anand, Gujarat",
    },

    paymentMethod: {
      type: String,
      default:
        "Cash on Delivery",
    },

    /* STATUS */

    status: {
      type: String,

      enum: [
        "Pending",
        "Completed",
      ],

      default: "Pending",
    },

    /* DATES */

    completedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );