import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Admin() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Electronics")
  const [stock, setStock] = useState("")

  const token = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products")
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders", config)
      setOrders(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/api/products", {
        name, description, price: Number(price), category, stock: Number(stock)
      }, config)
      alert("Product added!")
      setName(""); setDescription(""); setPrice(""); setStock("")
      fetchProducts()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, config)
      fetchProducts()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:3000/api/orders/${orderId}`, { status }, config)
      fetchOrders()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>

      {/* Add Product */}
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Food</option>
          <option>Books</option>
          <option>Other</option>
        </select><br />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} /><br />
        <button type="submit">Add Product</button>
      </form>

      {/* Products List */}
      <h2>All Products</h2>
      {products.map(product => (
        <div key={product._id}>
          <strong>{product.name}</strong> — ₹{product.price} — Stock: {product.stock}
          <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
        </div>
      ))}

      {/* Orders List */}
      <h2>All Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          <p>User: {order.user.username}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <select value={order.status} onChange={(e) => handleUpdateStatus(order._id, e.target.value)}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Admin