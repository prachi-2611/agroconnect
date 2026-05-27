const Product = require("../models/Product");

/* =========================================
   ADD PRODUCT
========================================= */

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      image,
      stock,
      unit,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      description,
      image,
      stock,
      unit,
      farmer: req.user._id,
      farmerName: req.user.name,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================================
   GET ALL PRODUCTS
========================================= */

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================================
   GET FARMER PRODUCTS
========================================= */

const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      farmer: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================================
   UPDATE PRODUCT (SAFE VERSION)
========================================= */

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Only allow safe fields to update
    const allowedFields = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      stock: req.body.stock,
      unit: req.body.unit,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================================
   DELETE PRODUCT (SAFE VERSION)
========================================= */

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getMyProducts,
  updateProduct,
  deleteProduct,
};