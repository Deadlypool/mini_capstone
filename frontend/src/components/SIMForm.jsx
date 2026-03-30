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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Mobile Number"
        value={form.mobile_number}
        onChange={(e) =>
          setForm({ ...form, mobile_number: e.target.value })
        }
      />

      <input
        placeholder="User ID"
        value={form.user_id}
        onChange={(e) =>
          setForm({ ...form, user_id: e.target.value })
        }
      />

      <button type="submit">Activate SIM</button>
    </form>
  );
}