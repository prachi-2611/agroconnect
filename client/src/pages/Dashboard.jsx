// client/src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";

function Dashboard() {

  const [data, setData] = useState(null);

  /* CART STATE */
  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
const [quantity, setQuantity] = useState(1);
const [deliveryAddress, setDeliveryAddress] = useState("");
const [buyLoading, setBuyLoading] = useState(false);
const [message, setMessage] = useState("");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const role = userInfo?.user?.role;

  const [activeSection, setActiveSection] =
    useState("");

  /* DEFAULT SECTION */
  useEffect(() => {
    if (!role) return;

    if (role === "farmer") {
      setActiveSection("analytics");
    } else {
      setActiveSection("wallet");
    }
  }, [role]);

  /* LOAD CART */
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  /* FETCH DASHBOARD */
  useEffect(() => {

    if (role === "farmer") {
      fetchFarmerDashboard();
    } else {
      fetchBuyerDashboard();
    }

  }, []);

  /* FARMER DASHBOARD */
  const fetchFarmerDashboard = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders/dashboard",
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  /* BUYER DASHBOARD */
  const fetchBuyerDashboard = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders/buyer",
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      const orders = res.data;

      const totalOrders = orders.length;

      const pendingOrders =
        orders.filter(o => o.status === "Pending").length;

      const completedOrders =
        orders.filter(o => o.status === "Completed").length;

      const totalSpent =
        orders.reduce((sum, o) => sum + o.totalPrice, 0);

      const today = new Date().toDateString();

      const todaySpent =
        orders
          .filter(o =>
            new Date(o.createdAt).toDateString() === today
          )
          .reduce((sum, o) => sum + o.totalPrice, 0);

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const weekSpent =
        orders
          .filter(o => new Date(o.createdAt) >= weekAgo)
          .reduce((sum, o) => sum + o.totalPrice, 0);

      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      const monthSpent =
        orders
          .filter(o => new Date(o.createdAt) >= monthAgo)
          .reduce((sum, o) => sum + o.totalPrice, 0);

      const categoryMap = {};

      orders.forEach(o => {

        const category = o.category || "Others";

        if (!categoryMap[category]) {
          categoryMap[category] = {
            name: category,
            value: 0,
          };
        }

        categoryMap[category].value += o.totalPrice || 0;
      });

      const categoryStats = Object.values(categoryMap);

      setData({
        orders,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalSpent,
        todaySpent,
        weekSpent,
        monthSpent,
        categoryStats,
      });

    } catch (error) {
      console.log(error);
    }
  };

  /* COMPLETE ORDER */
  const completeOrder = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchFarmerDashboard();

    } catch (error) {
      console.log(error);
    }
  };

  const buyHandler = async () => {
  try {
    setMessage("");

    if (!deliveryAddress) {
      setMessage("Please enter delivery address");
      return;
    }

    setBuyLoading(true);

    await axios.post(
      "http://localhost:5000/api/orders",
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
  /* REMOVE FROM CART */
  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (!data) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  const buyerChart = [
    { name: "Today", amount: data.todaySpent || 0 },
    { name: "Week", amount: data.weekSpent || 0 },
    { name: "Month", amount: data.monthSpent || 0 },
    { name: "Total", amount: data.totalSpent || 0 },
  ];

  const farmerChart = [
    { name: "Orders", amount: data.totalOrders || 0 },
    { name: "Pending", amount: data.pendingOrders || 0 },
    { name: "Completed", amount: data.completedOrders || 0 },
    { name: "Revenue", amount: data.totalRevenue || 0 },
  ];

  const pieData =
    role === "farmer"
      ? (data.topProducts || []).map(p => ({
          name: p.name,
          value: p.revenue,
        }))
      : data.categoryStats || [];

  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (

    <div className="dashboard-page">

      {/* HERO */}
      <div className="dashboard-hero">
        <div>
          <h1>
            Welcome Back, {userInfo?.user?.name} 👋
          </h1>

          <p>
            {role === "farmer"
              ? "Manage your farm business and revenue"
              : "Track your purchases and spending"}
          </p>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="stats-grid">

        <div
          className={`stats-card ${activeSection === "orders" ? "active-card" : ""}`}
          onClick={() => setActiveSection("orders")}
        >
          <div className="stats-icon green"><FaBox /></div>
          <div>
            <h4>Total Orders</h4>
            <h2>{data.totalOrders}</h2>
          </div>
        </div>

        <div
          className={`stats-card ${activeSection === "pending" ? "active-card" : ""}`}
          onClick={() => setActiveSection("pending")}
        >
          <div className="stats-icon yellow"><FaClock /></div>
          <div>
            <h4>Pending</h4>
            <h2>{data.pendingOrders}</h2>
          </div>
        </div>

        <div
          className={`stats-card ${activeSection === "completed" ? "active-card" : ""}`}
          onClick={() => setActiveSection("completed")}
        >
          <div className="stats-icon blue"><FaCheckCircle /></div>
          <div>
            <h4>Completed</h4>
            <h2>{data.completedOrders}</h2>
          </div>
        </div>

        {/* CART CARD (CLICKABLE) */}
        {role === "buyer" && (
          <div
            className={`stats-card ${activeSection === "cart" ? "active-card" : ""}`}
            onClick={() => setActiveSection("cart")}
          >
            <div className="stats-icon green">🛒</div>
            <div>
              <h4>Cart Items</h4>
              <h2>{cart.length}</h2>
            </div>
          </div>
        )}

        {/* TOTAL SPENT */}
        {role === "buyer" && (
          <div
            className={`stats-card revenue ${activeSection === "wallet" ? "active-card" : ""}`}
            onClick={() => setActiveSection("wallet")}
          >
            <div className="stats-icon white"><FaWallet /></div>
            <div>
              <h4>Total Spent</h4>
              <h2>₹{data.totalSpent}</h2>
            </div>
          </div>
        )}

      </div>

      {/* ================= CART SECTION ================= */}
{role === "buyer" && activeSection === "cart" && (

  <div className="dashboard-panel">

    <div className="panel-header">
      <h3>My Cart</h3>
    </div>

    <div className="orders-grid">

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (

          <div className="product-card" key={item._id}>

  <img
    src={item.image}
    alt={item.name}
    className="product-image"
  />

  <div className="product-content">

    <span className="badge">{item.category}</span>

    <h2>{item.name}</h2>

    <p className="product-price">
      ₹{item.price} per unit
    </p>

    <p className="product-meta">
      Available in cart
    </p>

    {/* BUTTONS */}
    <div className="product-actions">

      {/* BUY NOW */}
      <button
        className="btn btn-primary"
        onClick={() => {
          setSelectedProduct(item);
          setQuantity(1);
          setDeliveryAddress("");
          setMessage("");
        }}
      >
        Buy Now
      </button>

      {/* REMOVE */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          const updatedCart = cart.filter(
            (p) => p._id !== item._id
          );

          setCart(updatedCart);
          localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
          );
        }}
      >
        Remove
      </button>

    </div>

  </div>

</div>

        ))
      )}

    </div>

  </div>

)}

      {/* ANALYTICS */}
      {((role === "buyer" && activeSection === "wallet") ||
        (role === "farmer" && activeSection === "analytics")) && (

        <div className="dashboard-grid">

          <div className="dashboard-panel">

            <div className="panel-header">
              <h3>
                {role === "buyer"
                  ? "Wallet Analytics"
                  : "Revenue Analytics"}
              </h3>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={
                  role === "buyer"
                    ? buyerChart
                    : farmerChart
                }
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          <div className="dashboard-panel">

            <div className="panel-header">
              <h3>
                {role === "buyer"
                  ? "Spending Categories"
                  : "Top Products"}
              </h3>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {pieData?.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      )}

      {/* ORDERS (UNCHANGED) */}
      {(activeSection === "orders" ||
        activeSection === "pending" ||
        activeSection === "completed") && (

        <div className="dashboard-panel">

          <div className="panel-header">
            <h3>
              {activeSection === "orders" && "All Orders"}
              {activeSection === "pending" && "Pending Orders"}
              {activeSection === "completed" && "Completed Orders"}
            </h3>
          </div>

          <div className="orders-grid">

            {data.orders
              ?.filter((o) => {

                if (activeSection === "pending") {
                  return o.status === "Pending";
                }

                if (activeSection === "completed") {
                  return o.status === "Completed";
                }

                return true;
              })
              .map((order) => (

                <div className="order-card" key={order._id}>

                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="order-image"
                  />

                  <div className="order-content">

                    <h3>{order.productName}</h3>

                    <p>📦 Quantity: {order.quantity} {order.unit}</p>
                    <p>💰 Price: ₹{order.totalPrice}</p>

                    <p>
                      {role === "buyer"
                        ? `👨‍🌾 Farmer: ${order.farmerName}`
                        : `🛒 Buyer: ${order.buyerName}`}
                    </p>

                    <p>📍 Address: {order.address}</p>
                    <p>💳 Payment: {order.paymentMethod}</p>

                    <p className="order-date">
                      📅 Ordered: {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <div className="order-bottom">

                      <span className={`status-badge ${order.status === "Completed" ? "completed" : "pending"}`}>
                        {order.status}
                      </span>

                      {role === "farmer" &&
                        order.status === "Pending" && (
                          <button
                            className="complete-btn"
                            onClick={() => completeOrder(order._id)}
                          >
                            Mark Completed
                          </button>
                        )}

                    </div>

                  </div>

                </div>

              ))}

          </div>

        </div>

      )}
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

        <label className="quantity-label">
          Delivery Address
        </label>

        <input
          className="quantity-input"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter delivery address"
        />

        <label className="quantity-label">
          Quantity
        </label>

        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {message && (
          <div className="order-success">
            {message}
          </div>
        )}

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

export default Dashboard;