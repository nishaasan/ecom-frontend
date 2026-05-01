import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const isAdmin = localStorage.getItem("isAdmin") === "true"

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    navigate("/")
  }

  return (
    <nav>
      <span onClick={() => navigate("/home")}>🛍️ EShop</span>
      <span onClick={() => navigate("/cart")}>🛒 Cart</span>
      <span onClick={() => navigate("/orders")}>📦 Orders</span>
      {isAdmin && <span onClick={() => navigate("/admin")}>⚙️ Admin</span>}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar