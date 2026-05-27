const cors = require("cors");

const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

/* DATABASE */

const connectDB = require("./config/db");

/* CONNECT DATABASE */

connectDB();

/* ROUTES */

const productRoutes = require("./routes/productRoutes");

const authRoutes = require("./routes/authRoutes");

const orderRoutes = require("./routes/orderRoutes");

/* APP */

const app = express();

app.use(cors({
  origin: "https://agroconnect-wine-rho.vercel.app/",
  credentials: true
}));
/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

/* TEST */

app.get("/", (req, res) => {

  res.send("AgroConnect Backend Running");
});

/* PORT */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});