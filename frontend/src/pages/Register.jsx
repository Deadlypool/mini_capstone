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
    <div>
      <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /> <br></br>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /> <br></br>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /> <br></br>
      <button type="submit">Register</button>
    </form>
    </div>
  );
}