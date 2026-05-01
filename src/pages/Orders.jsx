import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Orders() {
  const [orders, setOrders] = useState([])

  const token = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders/myorders", config)
      setOrders(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <Navbar />
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet!</p>
      ) : (
        orders.map(order => (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Address: {order.shippingAddress.street}, {order.shippingAddress.city}</p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.product.name} x {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default Orders