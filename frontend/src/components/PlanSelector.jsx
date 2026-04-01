export default function PlanSelector({ plans, selectedPlan, setSelectedPlan }) {
  return (
    <div className="selector-group">
      <div className="panel-header">
        <div>
          <h2 className="card-title">Select Plan</h2>
          <p className="card-subtitle">
            Compare available plan pricing before confirming the recharge.
          </p>
        </div>
        <span className="badge">{plans.length}</span>
      </div>

      {plans.length === 0 ? (
        <div className="empty-state">No plans available right now.</div>
      ) : (
        <div className="selector-options">
          {plans.map((plan) => (
            <label
              key={plan.id}
              className={`selector-card ${selectedPlan === plan.id ? "is-selected" : ""}`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={selectedPlan === plan.id}
                onChange={() => setSelectedPlan(plan.id)}
              />
              <div>
                <span className="selector-title">{plan.name}</span>
                <span className="selector-meta">
                  Rs {plan.price} • {plan.validity_days} days • {plan.data_limit}
                </span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
