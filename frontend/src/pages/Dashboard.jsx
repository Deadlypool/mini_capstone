import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const roleLabel = user?.role || "guest";

  return (
    <main className="page-shell page-stack">
      <section className="page-header hero-card">
        <div>
          <span className="hero-kicker">Account overview</span>
          <h1 className="page-title">Welcome back, {user?.name || "there"}.</h1>
          <p className="page-subtitle">
            Your workspace keeps plans, SIM actions, and recharge activity in one
            clean control center.
          </p>
        </div>

        <div className="hero-stat">
          <strong>{roleLabel}</strong>
          <span>Current access role</span>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Signed in as</p>
          <p className="stat-value">{user?.name || "Guest"}</p>
          <p className="stat-note">Your account identity for this session.</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Access level</p>
          <p className="stat-value text-capitalize">{roleLabel}</p>
          <p className="stat-note">Feature availability adapts to your role.</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Next step</p>
          <p className="stat-value">Manage</p>
          <p className="stat-note">Jump into plans, SIMs, or recharge workflows.</p>
        </article>
      </section>

      <section className="content-grid content-grid--two">
        <article className="card">
          <div className="panel-header">
            <div>
              <h2 className="card-title">Portal snapshot</h2>
              <p className="card-subtitle">
                A quick summary of how this app is organized for everyday work.
              </p>
            </div>
            <span className="badge">Live</span>
          </div>

          <div className="dashboard-notes">
            <div className="note-row">
              <span className="note-marker" />
              <div>
                <strong>Plans</strong>
                View the current catalog and, if you are an admin, create or edit entries.
              </div>
            </div>
            <div className="note-row">
              <span className="note-marker" />
              <div>
                <strong>SIM management</strong>
                Customers can review SIMs, agents can activate them, and admins can suspend them.
              </div>
            </div>
            <div className="note-row">
              <span className="note-marker" />
              <div>
                <strong>Recharge</strong>
                Pick a SIM, select a plan, complete the recharge, and review history below.
              </div>
            </div>
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">Session details</h2>
          <p className="card-subtitle">
            These values come from the current authenticated user context.
          </p>

          <div className="app-card-list mt-18">
            <div className="data-point">
              <span className="data-point-label">User</span>
              <span className="data-point-value">{user?.name || "Unknown"}</span>
            </div>
            <div className="data-point">
              <span className="data-point-label">Role</span>
              <span className="data-point-value text-capitalize">
                {roleLabel}
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
