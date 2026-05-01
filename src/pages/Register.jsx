import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username, email, password
      })
      alert("Registered successfully!")
      navigate("/")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  )
}

export default Register