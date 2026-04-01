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
    <main className="page-shell auth-layout">
      <section className="card auth-card">
        <div className="page-header page-header--auth">
          <div>
            <span className="hero-kicker">Welcome back</span>
            <h1 className="page-title">Login</h1>
            <p className="page-subtitle">
              Sign in to manage plans, view SIM activity, and complete recharges.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="app-form mt-22">
          <div className="field-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="field-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

        <p className="auth-footer">Use your registered account to continue.</p>
      </section>
    </main>
  );
}
