import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function Home() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

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

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/cart", {
        productId,
        quantity: 1
      }, config)
      alert("Added to cart!")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <div>
        {products.map(product => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addToCart(product._id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home