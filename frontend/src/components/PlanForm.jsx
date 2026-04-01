import { useState, useEffect } from "react";

export default function PlanForm({ onSubmit, selectedPlan, clearEdit }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    validity_days: "",
    data_limit: "",
    calls: "",
  });

  useEffect(() => {
    if (selectedPlan) {
      setForm(selectedPlan);
    }
  }, [selectedPlan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      price: "",
      validity_days: "",
      data_limit: "",
      calls: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="plan-name">Name</label>
          <input
            id="plan-name"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label htmlFor="plan-price">Price</label>
          <input
            id="plan-price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>

        <div className="field-group">
          <label htmlFor="plan-validity">Validity in days</label>
          <input
            id="plan-validity"
            placeholder="Validity"
            type="number"
            value={form.validity_days}
            onChange={(e) => setForm({ ...form, validity_days: Number(e.target.value) })}
          />
        </div>

        <div className="field-group">
          <label htmlFor="plan-data-limit">Data limit</label>
          <input
            id="plan-data-limit"
            placeholder="Data limit"
            value={form.data_limit}
            onChange={(e) => setForm({ ...form, data_limit: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label htmlFor="plan-calls">Calls</label>
          <input
            id="plan-calls"
            placeholder="Calls"
            value={form.calls}
            onChange={(e) => setForm({ ...form, calls: e.target.value })}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {selectedPlan ? "Update Plan" : "Create Plan"}
        </button>

        {selectedPlan && (
          <button type="button" className="btn btn-ghost" onClick={clearEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
