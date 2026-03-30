export default function PlanCard({ plan, isAdmin, onDelete, onEdit }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{plan.name}</h3>
      <p>Price: ₹{plan.price}</p>
      <p>Validity: {plan.validity_days} days</p>
      <p>Data: {plan.data_limit}</p>
      <p>Calls: {plan.calls}</p>

      {isAdmin && (
        <>
          <button onClick={() => onEdit(plan)}>Edit</button>
          <button onClick={() => onDelete(plan.id)}>Delete</button>
        </>
      )}
    </div>
  );
}