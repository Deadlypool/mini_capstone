import { useState, useContext } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // ✅ Save token
      login(res.data.access_token);

      // ✅ Redirect to dashboard
      navigate("/");
      console.log("Navigating...");

    } catch (err) {
      // ❌ Show error alert
      alert(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /> <br></br>

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /> <br></br>

      <button type="submit">Login</button>
    </form>
    </div>
  );
}