import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    alert("Registered successfully!");
  };

  return (
    <main className="page-shell auth-layout">
      <section className="card auth-card">
        <div className="page-header page-header--auth">
          <div>
            <span className="hero-kicker">New account</span>
            <h1 className="page-title">Register</h1>
            <p className="page-subtitle">
              Create an account to access the telecom dashboard and protected flows.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="app-form mt-22">
          <div className="field-group">
            <label htmlFor="register-name">Name</label>
            <input
              id="register-name"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>

        <p className="auth-footer">A quick registration is all you need to get started.</p>
      </section>
    </main>
  );
}
