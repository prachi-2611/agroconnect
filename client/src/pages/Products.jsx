// client/src/pages/Products.jsx

import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [buyLoading, setBuyLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [cart, setCart] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Grains",
    "Pulses",
    "Dairy",
    "Organic",
    "Dry Fruits",
    "Seeds",
    "Spices",
  ];

  /* FETCH PRODUCTS */
  const fetchProducts = async () => {
    try {
      let url = "https://agroconnect-api-e68t.onrender.com/api/products";

      if (userInfo?.user?.role === "farmer") {
        url = "https://agroconnect-api-e68t.onrender.com/api/products/my-products";
      }

      const config = {};

      if (userInfo) {
        config.headers = {
          Authorization: `Bearer ${userInfo.token}`,
        };
      }

      const { data } = await axios.get(url, config);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  /* BUY HANDLER */
  const buyHandler = async () => {
    try {
      setMessage("");

      if (!deliveryAddress) {
        setMessage("Please enter delivery address");
        return;
      }

      if (Number(quantity) > selectedProduct.stock) {
        setMessage("Out of Stock");
        return;
      }

      setBuyLoading(true);

      await axios.post(
        "https://agroconnect-api-e68t.onrender.com/api/orders",
        {
          productId: selectedProduct._id,
          quantity,
          deliveryAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessage("Order Placed Successfully");

      const updatedProducts = products.map((p) =>
        p._id === selectedProduct._id
          ? { ...p, stock: p.stock - Number(quantity) }
          : p
      );

      setProducts(updatedProducts);

      setTimeout(() => {
        setSelectedProduct(null);
        setQuantity(1);
        setDeliveryAddress("");
        setMessage("");
      }, 1200);

      setBuyLoading(false);
    } catch (error) {
      console.log(error);
      setBuyLoading(false);
      setMessage("Error placing order");
    }
  };

  /* ADD TO CART */
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Added to cart");
  };
  
  const isInCart = (productId) => {
  return cart.some((item) => item._id === productId);
};

  /* FILTER */
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container main-content">
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="container main-content">

      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">
          {userInfo?.user?.role === "farmer"
            ? "My Products"
            : "All Products"}
        </h1>
        <p className="page-subtitle">
          Fresh products directly from farmers
        </p>
      </div>

      {/* TOPBAR */}
      <div className="products-topbar">

        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${
                selectedCategory === cat ? "active-category" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="product-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PRODUCTS */}
      <div className="products-grid">

        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-content">

              <span className="badge">{product.category}</span>

              <h2>{product.name}</h2>

              <p className="product-price">
                ₹{product.price} per {product.unit}
              </p>

              <p className="product-description">
                {product.description}
              </p>

              <p className="product-meta">
                Farmer: {product.farmerName}
              </p>

              <p className="product-meta">
                Available: {product.stock} {product.unit}
              </p>

              {/* BUTTONS */}
              <div className="product-actions">

                {userInfo?.user?.role === "buyer" && (
                  <>
                    <button
  className="btn btn-primary"
  onClick={() => {
    setSelectedProduct(product);
    setQuantity(1);
    setMessage("");
  }}
>
  Buy Now
</button>

{isInCart(product._id) ? (
  <button
    className="btn btn-secondary"
    onClick={() => {
      const updatedCart = cart.filter(
        (item) => item._id !== product._id
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }}
  >
    Remove
  </button>
) : (
  <button
    className="btn btn-secondary"
    onClick={() => addToCart(product)}
  >
    Add To Cart
  </button>
)}
                  </>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= BUY MODAL ================= */}
      {selectedProduct && (
        <div className="modal-overlay">

          <div className="buy-modal">

            {/* LEFT */}
            <div className="buy-left">
              <img
                src={selectedProduct.image}
                className="modal-image"
                alt={selectedProduct.name}
              />
            </div>

            {/* RIGHT */}
            <div className="buy-right">

              <h2 className="buy-title">Place Order</h2>

              <h3 className="buy-product-name">
                {selectedProduct.name}
              </h3>

              <p className="buy-info">
                <strong>Price:</strong> ₹{selectedProduct.price}
              </p>

              <p className="buy-info">
                <strong>Stock:</strong> {selectedProduct.stock}
              </p>

              {/* ADDRESS */}
              <label className="quantity-label">
                Delivery Address
              </label>

              <input
                className="quantity-input"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter delivery address"
              />

              {/* QUANTITY */}
              <label className="quantity-label">
                Quantity
              </label>

              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* MESSAGE */}
              {message && (
                <div className="order-success">
                  {message}
                </div>
              )}

              {/* BUTTONS */}
              <div className="modal-buttons">

                <button
                  className="btn btn-primary update-btn"
                  onClick={buyHandler}
                  disabled={buyLoading}
                >
                  {buyLoading ? "Placing..." : "Buy Now"}
                </button>
                <button
                  className="btn btn-secondary cancel-btn"
                  onClick={() => setSelectedProduct(null)}
                >
                  Cancel
                </button>

                

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;