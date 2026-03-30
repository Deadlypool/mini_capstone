import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
      
      {/* <Link to="/">Home</Link> */}

      {!user ? (
        <>
          {/* Public links */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          {/* Protected links */}
          <Link to="/">Dashboard</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/sims">My SIMs</Link>
          <Link to="/recharge">Recharge</Link>

          <span style={{ marginLeft: "auto" }}>
            {user.name} ({user.role})
          </span>

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}