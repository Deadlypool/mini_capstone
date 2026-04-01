export default function RechargeHistory({ history }) {
  return (
    <div>
      <div className="panel-header">
        <div>
          <h2 className="card-title">Recharge History</h2>
          <p className="card-subtitle">
            A running record of successful and pending recharge attempts.
          </p>
        </div>
        <span className="badge">{history.length}</span>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">No recharge history yet.</div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <article key={item.id} className="history-item">
              <div>
                <h3 className="history-title">Recharge #{item.id}</h3>
                <p className="history-meta">
                  {new Date(item.recharged_at).toLocaleString()}
                </p>
              </div>

              <div>
                <div className="history-amount">Rs {item.amount}</div>
                <span className="status-pill" data-status={item.status}>
                  {item.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
