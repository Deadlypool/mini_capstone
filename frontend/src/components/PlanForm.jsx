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
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Price" type="number" value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />

      <input placeholder="Validity" type="number" value={form.validity_days}
        onChange={(e) => setForm({ ...form, validity_days: Number(e.target.value) })} />

      <input placeholder="Data limit" value={form.data_limit}
        onChange={(e) => setForm({ ...form, data_limit: e.target.value })} />

      <input placeholder="Calls" value={form.calls}
        onChange={(e) => setForm({ ...form, calls: e.target.value })} />

      <button type="submit">
        {selectedPlan ? "Update Plan" : "Create Plan"}
      </button>

      {selectedPlan && <button onClick={clearEdit}>Cancel</button>}
    </form>
  );
}