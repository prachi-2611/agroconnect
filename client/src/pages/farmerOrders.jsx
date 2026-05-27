import { useEffect, useState } from "react";
import axios from "axios";

function FarmerOrders() {

  const [orders, setOrders] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/orders/farmer-orders",
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setOrders(data);
  };

  const completeOrder = async (id) => {
    await axios.put(
      `http://localhost:5000/api/orders/complete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    fetchOrders();
  };

  return (
    <div className="container main-content">

      <h1>Farmer Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="card">

          <h3>{order.productId.name}</h3>

          <p>Qty: {order.quantity}</p>

          <p>Total: ₹{order.totalPrice}</p>

          <p>Status: {order.status}</p>

          {order.status === "Pending" && (
            <button
              className="btn btn-primary"
              onClick={() => completeOrder(order._id)}
            >
              Mark Completed
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default FarmerOrders;