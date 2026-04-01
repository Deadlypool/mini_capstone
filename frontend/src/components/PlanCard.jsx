export default function PlanCard({ plan, isAdmin, onDelete, onEdit }) {
  return (
    <article className="app-card-item">
      <div className="app-card-header">
        <div>
          <p className="eyebrow">Recharge plan</p>
          <h3 className="app-card-title">{plan.name}</h3>
        </div>

        <div className="price-tag">
          <span>Rs</span>
          <strong>{plan.price}</strong>
        </div>
      </div>

      <div className="app-card-grid">
        <div className="data-point">
          <span className="data-point-label">Validity</span>
          <span className="data-point-value">{plan.validity_days} days</span>
        </div>
        <div className="data-point">
          <span className="data-point-label">Data</span>
          <span className="data-point-value">{plan.data_limit}</span>
        </div>
        <div className="data-point">
          <span className="data-point-label">Calls</span>
          <span className="data-point-value">{plan.calls}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="button-row mt-18">
          <button type="button" className="btn btn-secondary" onClick={() => onEdit(plan)}>
            Edit
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onDelete(plan.id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
