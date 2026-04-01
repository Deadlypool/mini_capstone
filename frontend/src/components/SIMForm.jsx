import { useState } from "react";

export default function SIMForm({ onSubmit }) {
  const [form, setForm] = useState({
    mobile_number: "",
    user_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ mobile_number: "", user_id: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="sim-mobile-number">Mobile Number</label>
          <input
            id="sim-mobile-number"
            placeholder="Mobile Number"
            value={form.mobile_number}
            onChange={(e) => setForm({ ...form, mobile_number: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label htmlFor="sim-user-id">User ID</label>
          <input
            id="sim-user-id"
            placeholder="User ID"
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Activate SIM</button>
      </div>
    </form>
  );
}
