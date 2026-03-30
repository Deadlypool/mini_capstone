export default function RechargeHistory({ history }) {
  return (
    <div>
      <h2>Recharge History</h2>

      {history.length === 0 ? (
        <p>No recharge history</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
          >
            <p>Amount: ₹{item.amount}</p>
            <p>Status: {item.status}</p>
            <p>Date: {new Date(item.recharged_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}