import { useEffect, useState, useContext } from "react";
import { getMySIMs, createSIM, suspendSIM } from "../api/simApi";
import SIMCard from "../components/SIMCard";
import SIMForm from "../components/SIMForm";
import { AuthContext } from "../context/AuthContext";

export default function Sims() {
  const [sims, setSims] = useState([]);
  const [simId, setSimId] = useState("");

  const { user } = useContext(AuthContext);
  const role = user?.role;

  useEffect(() => {
    if (role === "customer") {
      fetchMySIMs();
    }
  }, [role]);

  const fetchMySIMs = async () => {
    try {
      const res = await getMySIMs();
      setSims(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createSIM(data);
      alert("SIM activated!");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const handleSuspend = async (id) => {
    try {
      await suspendSIM(id);
      fetchMySIMs();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const handleAdminSuspend = async () => {
    try {
      await suspendSIM(simId);
      alert("SIM suspended successfully");
      setSimId("");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <main className="page-shell page-stack">
      <section className="page-header">
        <div>
          <span className="hero-kicker">SIM operations</span>
          <h1 className="page-title">SIM Management</h1>
          <p className="page-subtitle">
            Your available actions change with your role, from activation to suspension.
          </p>
        </div>
        <div className="hero-stat">
          <strong className="text-capitalize">{role || "guest"}</strong>
          <span>Current workflow</span>
        </div>
      </section>

      {role === "customer" && (
        <section className="card">
          <div className="panel-header">
            <div>
              <h2 className="card-title">Your SIMs</h2>
              <p className="card-subtitle">
                Review the mobile numbers linked to your account and track status instantly.
              </p>
            </div>
            <span className="badge">{sims.length}</span>
          </div>

          {sims.length === 0 ? (
            <div className="empty-state">No SIMs found for this account.</div>
          ) : (
            <div className="app-card-list">
              {sims.map((sim) => (
                <SIMCard
                  key={sim.id}
                  sim={sim}
                  role={role}
                  onSuspend={handleSuspend}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {role === "agent" && (
        <section className="card">
          <div className="panel-header">
            <div>
              <h2 className="card-title">Activate SIM</h2>
              <p className="card-subtitle">
                Provision a new SIM by linking a mobile number with a user account.
              </p>
            </div>
            <span className="badge">Agent</span>
          </div>
          <SIMForm onSubmit={handleCreate} />
        </section>
      )}

      {role === "admin" && (
        <section className="card">
          <div className="panel-header">
            <div>
              <h2 className="card-title">Suspend SIM</h2>
              <p className="card-subtitle">
                Enter a SIM id to immediately disable service from the admin console.
              </p>
            </div>
            <span className="badge">Admin</span>
          </div>

          <div className="app-form">
            <div className="field-group">
              <label htmlFor="admin-sim-id">SIM ID</label>
              <input
                id="admin-sim-id"
                placeholder="Enter SIM ID"
                value={simId}
                onChange={(e) => setSimId(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleAdminSuspend}
                disabled={!simId}
              >
                Suspend SIM
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
