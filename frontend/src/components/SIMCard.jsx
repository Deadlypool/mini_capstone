export default function SIMCard({ sim, role, onSuspend }) {
  return (
    <article className="app-card-item">
      <div className="app-card-header">
        <div>
          <p className="eyebrow">Mobile number</p>
          <h3 className="app-card-title">{sim.mobile_number}</h3>
        </div>

        <span className="status-pill" data-status={sim.status}>
          {sim.status}
        </span>
      </div>

      <div className="app-card-grid">
        <div className="data-point">
          <span className="data-point-label">SIM ID</span>
          <span className="data-point-value">{sim.id}</span>
        </div>
        <div className="data-point">
          <span className="data-point-label">Status</span>
          <span className="data-point-value text-capitalize">
            {sim.status}
          </span>
        </div>
      </div>

      {role === "admin" && sim.status !== "suspended" && (
        <div className="button-row mt-18">
          <button type="button" className="btn btn-danger" onClick={() => onSuspend(sim.id)}>
            Suspend SIM
          </button>
        </div>
      )}
    </article>
  );
}
