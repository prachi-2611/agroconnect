const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const User = require("./models/User");

/* CONNECT DB */
mongoose.connect(process.env.MONGO_URI);

/* FARMERS (from your DB) */
const farmers = [
  "6a09e9a6b2a99633eaf37c17",
  "6a09e9b2b2a99633eaf37c18",
  "6a09e9bfb2a99633eaf37c19",
  "6a09e9cab2a99633eaf37c1a",
  "6a0d9f2b93ec9888df8d1b7a",
];

/* IMAGE MAP */
const images = {
  tomato: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  banana: "https://images.unsplash.com/photo-1604909052743-94e8384f2f0f",
  papaya: "https://images.unsplash.com/photo-1615485925600-97237c4fc7a2",
  wheat: "https://images.unsplash.com/photo-1615485290382-441e4d9f4b1c",
  rice: "https://images.unsplash.com/photo-1615484477778-ca3f5b3f0a14",
  corn: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
  barley: "https://images.unsplash.com/photo-1615484477778-ca3f5b3f0a14",
  moong: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
  chana: "https://images.unsplash.com/photo-1615484477778-ca3f5b3f0a14",
  rajma: "https://images.unsplash.com/photo-1615485290382-441e4d9f4b1c",
  curd: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  cheese: "https://images.unsplash.com/photo-1542838132-92c53300491e",
  coriander: "https://images.unsplash.com/photo-1604909052743-94e8384f2f0f",
  cumin: "https://images.unsplash.com/photo-1615484477778-ca3f5b3f0a14",
  chilli: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
  turmeric: "https://images.unsplash.com/photo-1615485925600-97237c4fc7a2",
  almond: "https://images.unsplash.com/photo-1604909052743-94e8384f2f0f",
  cashews: "https://images.unsplash.com/photo-1615485925600-97237c4fc7a2",
  walnuts: "https://images.unsplash.com/photo-1615485290382-441e4d9f4b1c",
  pistachios: "https://images.unsplash.com/photo-1615484477778-ca3f5b3f0a14",
  raisins: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f",
};

/* PRODUCTS DATA */
const products = [
  // VEGETABLES
  {
    name: "Fresh Tomato",
    category: "Vegetables",
    key: "tomato",
    price: 30,
    unit: "kg",
    stock: 120,
  },
  {
    name: "Banana",
    category: "Fruits",
    key: "banana",
    price: 40,
    unit: "dozen",
    stock: 150,
  },
  {
    name: "Papaya",
    category: "Fruits",
    key: "papaya",
    price: 25,
    unit: "kg",
    stock: 90,
  },

  // GRAINS
  {
    name: "Wheat",
    category: "Grains",
    key: "wheat",
    price: 28,
    unit: "kg",
    stock: 500,
  },
  {
    name: "Rice",
    category: "Grains",
    key: "rice",
    price: 45,
    unit: "kg",
    stock: 400,
  },
  {
    name: "Corn",
    category: "Grains",
    key: "corn",
    price: 35,
    unit: "kg",
    stock: 200,
  },
  {
    name: "Barley",
    category: "Grains",
    key: "barley",
    price: 32,
    unit: "kg",
    stock: 180,
  },

  // PULSES
  {
    name: "Moong Dal",
    category: "Pulses",
    key: "moong",
    price: 120,
    unit: "kg",
    stock: 150,
  },
  {
    name: "Chana Dal",
    category: "Pulses",
    key: "chana",
    price: 90,
    unit: "kg",
    stock: 140,
  },
  {
    name: "Rajma",
    category: "Pulses",
    key: "rajma",
    price: 130,
    unit: "kg",
    stock: 160,
  },

  // DAIRY
  {
    name: "Fresh Curd",
    category: "Dairy",
    key: "curd",
    price: 60,
    unit: "kg",
    stock: 80,
  },
  {
    name: "Cheese",
    category: "Dairy",
    key: "cheese",
    price: 250,
    unit: "kg",
    stock: 60,
  },

  // SPICES
  {
    name: "Coriander",
    category: "Spices",
    key: "coriander",
    price: 80,
    unit: "kg",
    stock: 70,
  },
  {
    name: "Cumin",
    category: "Spices",
    key: "cumin",
    price: 200,
    unit: "kg",
    stock: 50,
  },
  {
    name: "Chilli Powder",
    category: "Spices",
    key: "chilli",
    price: 180,
    unit: "kg",
    stock: 60,
  },
  {
    name: "Turmeric",
    category: "Spices",
    key: "turmeric",
    price: 150,
    unit: "kg",
    stock: 65,
  },

  // DRY FRUITS
  {
    name: "Almonds",
    category: "Dry Fruits",
    key: "almond",
    price: 700,
    unit: "kg",
    stock: 40,
  },
  {
    name: "Cashews",
    category: "Dry Fruits",
    key: "cashews",
    price: 850,
    unit: "kg",
    stock: 35,
  },
  {
    name: "Walnuts",
    category: "Dry Fruits",
    key: "walnuts",
    price: 900,
    unit: "kg",
    stock: 30,
  },
  {
    name: "Pistachios",
    category: "Dry Fruits",
    key: "pistachios",
    price: 950,
    unit: "kg",
    stock: 25,
  },
  {
    name: "Raisins",
    category: "Dry Fruits",
    key: "raisins",
    price: 400,
    unit: "kg",
    stock: 45,
  },
];

/* SEED FUNCTION */
const seed = async () => {
  try {
    await Product.deleteMany();

    let farmerIndex = 0;

    const finalProducts = [];

    products.forEach((p) => {
      const farmer = farmers[farmerIndex % farmers.length];

      finalProducts.push({
        name: p.name,
        price: p.price,
        category: p.category,
        description: `${p.name} fresh and high quality directly from farm`,
        image: images[p.key],
        stock: p.stock,
        unit: p.unit,
        farmer,
        farmerName: `farmer${(farmerIndex % 5) + 1}`,
      });

      farmerIndex++;
    });

    await Product.insertMany(finalProducts);

    console.log("✅ Seed Completed Successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error);
    process.exit(1);
  }
};

seed();