export default function SIMSelector({ sims, selectedSIM, setSelectedSIM }) {
  return (
    <div className="selector-group">
      <div className="panel-header">
        <div>
          <h2 className="card-title">Select SIM</h2>
          <p className="card-subtitle">
            Pick the SIM you want to recharge from the options below.
          </p>
        </div>
        <span className="badge">{sims.length}</span>
      </div>

      {sims.length === 0 ? (
        <div className="empty-state">No SIMs available for recharge.</div>
      ) : (
        <div className="selector-options">
          {sims.map((sim) => (
            <label
              key={sim.id}
              className={`selector-card ${selectedSIM === sim.id ? "is-selected" : ""}`}
            >
              <input
                type="radio"
                name="sim"
                value={sim.id}
                checked={selectedSIM === sim.id}
                onChange={() => setSelectedSIM(sim.id)}
              />
              <div>
                <span className="selector-title">{sim.mobile_number}</span>
                <span className="selector-meta">Status: {sim.status}</span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
