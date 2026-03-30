export default function SIMCard({ sim, role, onSuspend }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{sim.mobile_number}</h3>
      <p>Status: {sim.status}</p>

      {role === "admin" && sim.status !== "suspended" && (
        <button onClick={() => onSuspend(sim.id)}>
          Suspend SIM
        </button>
      )}
    </div>
  );
}