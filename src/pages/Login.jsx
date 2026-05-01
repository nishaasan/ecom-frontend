import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email, password
      })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("isAdmin", res.data.user.isAdmin)
      
      if (res.data.user.isAdmin) {
        navigate("/admin")
      } else {
        navigate("/home")
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  )
}

export default Login