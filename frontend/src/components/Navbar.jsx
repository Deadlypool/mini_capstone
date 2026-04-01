import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const initials = user?.name?.slice(0, 1)?.toUpperCase() || "G";

  return (
    <nav className="app-navbar">
      <div className="app-navbar__inner">
        <Link to={user ? "/" : "/login"} className="app-navbar__brand">
          <span className="brand-mark">Mini Capstone</span>
          <span className="brand-name">Telecom Portal</span>
        </Link>

        {!user ? (
          <div className="app-navbar__links app-navbar__links--grow">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </div>
        ) : (
          <>
            <div className="app-navbar__links app-navbar__links--grow">
              <Link to="/" className="nav-link">Dashboard</Link>
              <Link to="/plans" className="nav-link">Plans</Link>
              <Link to="/sims" className="nav-link">My SIMs</Link>
              <Link to="/recharge" className="nav-link">Recharge</Link>
            </div>

            <div className="user-chip">
              <span className="user-chip__avatar">{initials}</span>
              <span className="user-chip__meta">
                <span className="user-chip__name">{user.name}</span>
                <span className="user-chip__role">{user.role}</span>
              </span>
            </div>

            <button type="button" className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
