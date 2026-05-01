import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function Cart() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", config)
      setCart(res.data.items)
      setTotal(res.data.total)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${productId}`, config)
      fetchCart()
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const placeOrder = async () => {
    try {
      await axios.post("http://localhost:3000/api/orders", {
        shippingAddress: { street, city, state, pincode }
      }, config)
      alert("Order placed successfully!")
      navigate("/orders")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <div>
      <Navbar />
      <h1>My Cart</h1>
      <h3>Total: ₹{total}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                <strong>{item.product.name}</strong> — 
                ₹{item.product.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.product._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3>Shipping Address</h3>
          <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} /><br />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} /><br />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} /><br />
          <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} /><br />
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  )
}

export default Cart