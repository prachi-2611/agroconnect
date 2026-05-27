const Order = require("../models/Order");
const Product = require("../models/Product");

/* =========================
   PLACE ORDER
========================= */

const placeOrder = async (req, res) => {
  try {

    const {
      productId,
      quantity,
      deliveryAddress,
    } = req.body;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (Number(quantity) > product.stock) {
      return res.status(400).json({
        message: "Not enough stock",
      });
    }

    const order = await Order.create({

      /* BUYER */

      buyer: req.user._id,
      buyerName: req.user.name,

      /* FARMER */

      farmer: product.farmer,
      farmerName: product.farmerName,

      /* PRODUCT */

      product: product._id,
      productName: product.name,
      productImage: product.image,

      /* ORDER */

      quantity: Number(quantity),
      unit: product.unit,

      totalPrice:
        Number(quantity) * product.price,

      /* DELIVERY */

      address:
        deliveryAddress || "Address not provided",

      paymentMethod:
        "Cash on Delivery",

      /* STATUS */

      status: "Pending",
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   BUYER ORDERS
========================= */

const getBuyerOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find({
        buyer: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   FARMER ORDERS
========================= */

const getFarmerOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find({
        farmer: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   COMPLETE ORDER
========================= */

const completeOrder = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "Completed") {

      return res.status(400).json({
        message: "Order already completed",
      });
    }

    const product =
      await Product.findById(
        order.product
      );

    /* REDUCE STOCK */

    if (product) {

      product.stock -= order.quantity;

      if (product.stock < 0) {
        product.stock = 0;
      }

      await product.save();
    }

    /* UPDATE ORDER */

    order.status = "Completed";

    order.completedAt =
      new Date();

    await order.save();

    res.json({
      message:
        "Order completed successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   FARMER DASHBOARD
========================= */

const getFarmerDashboard =
  async (req, res) => {

    try {

      const orders =
        await Order.find({
          farmer: req.user._id,
        }).sort({
          createdAt: -1,
        });

      /* FILTERS */

      const completedOrders =
        orders.filter(
          (o) =>
            o.status === "Completed"
        );

      const pendingOrders =
        orders.filter(
          (o) =>
            o.status === "Pending"
        );

      /* REVENUE */

      const totalRevenue =
        completedOrders.reduce(
          (sum, order) =>
            sum + order.totalPrice,
          0
        );

      /* TODAY */

      const today =
        new Date().toDateString();

      const todayRevenue =
        completedOrders
          .filter(
            (o) =>
              o.completedAt &&
              new Date(
                o.completedAt
              ).toDateString() === today
          )
          .reduce(
            (sum, order) =>
              sum + order.totalPrice,
            0
          );

      /* WEEK */

      const weekAgo =
        new Date();

      weekAgo.setDate(
        weekAgo.getDate() - 7
      );

      const weekRevenue =
        completedOrders
          .filter(
            (o) =>
              o.completedAt &&
              new Date(
                o.completedAt
              ) >= weekAgo
          )
          .reduce(
            (sum, order) =>
              sum + order.totalPrice,
            0
          );

      /* MONTH */

      const monthAgo =
        new Date();

      monthAgo.setMonth(
        monthAgo.getMonth() - 1
      );

      const monthRevenue =
        completedOrders
          .filter(
            (o) =>
              o.completedAt &&
              new Date(
                o.completedAt
              ) >= monthAgo
          )
          .reduce(
            (sum, order) =>
              sum + order.totalPrice,
            0
          );

      /* PRODUCT ANALYTICS */

      const productMap = {};

      completedOrders.forEach(
        (order) => {

          if (
            !productMap[
              order.productName
            ]
          ) {

            productMap[
              order.productName
            ] = {

              name:
                order.productName,

              image:
                order.productImage,

              qty: 0,

              revenue: 0,

              customers: 0,
            };
          }

          productMap[
            order.productName
          ].qty += order.quantity;

          productMap[
            order.productName
          ].revenue +=
            order.totalPrice;

          productMap[
            order.productName
          ].customers += 1;
        }
      );

      const topProducts =
        Object.values(productMap)
          .sort(
            (a, b) =>
              b.qty - a.qty
          );

      /* CUSTOMER ANALYTICS */

      const customerMap = {};

      completedOrders.forEach(
        (order) => {

          if (
            !customerMap[
              order.buyerName
            ]
          ) {

            customerMap[
              order.buyerName
            ] = {

              customer:
                order.buyerName,

              orders: 0,

              spent: 0,
            };
          }

          customerMap[
            order.buyerName
          ].orders += 1;

          customerMap[
            order.buyerName
          ].spent +=
            order.totalPrice;
        }
      );

      const topCustomers =
        Object.values(customerMap)
          .sort(
            (a, b) =>
              b.spent - a.spent
          );

      /* RESPONSE */

      res.json({

        totalOrders:
          orders.length,

        pendingOrders:
          pendingOrders.length,

        completedOrders:
          completedOrders.length,

        totalRevenue,

        todayRevenue,

        weekRevenue,

        monthRevenue,

        orders,

        topProducts,

        topCustomers,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {

  placeOrder,

  getBuyerOrders,

  getFarmerOrders,

  completeOrder,

  getFarmerDashboard,
};