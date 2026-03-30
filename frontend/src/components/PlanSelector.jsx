export default function PlanSelector({ plans, selectedPlan, setSelectedPlan }) {
  return (
    <div>
      <h3>Select Plan</h3>

      {plans.map((plan) => (
        <div key={plan.id}>
          <input
            type="radio"
            name="plan"
            value={plan.id}
            onChange={() => setSelectedPlan(plan.id)}
          />
          {plan.name} - ₹{plan.price}
        </div>
      ))}
    </div>
  );
}