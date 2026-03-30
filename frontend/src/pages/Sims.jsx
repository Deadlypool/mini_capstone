import { useEffect, useState, useContext } from "react";
import { getMySIMs, createSIM, suspendSIM } from "../api/simApi";
import SIMCard from "../components/SIMCard";
import SIMForm from "../components/SIMForm";
import { AuthContext } from "../context/AuthContext";

export default function Sims() {
  const [sims, setSims] = useState([]);
  const [simId, setSimId] = useState(""); // ✅ moved inside

  const { user } = useContext(AuthContext);
  const role = user?.role;

  useEffect(() => {
    if (role === "customer") {
      fetchMySIMs();
    }
  }, [role]);

  const fetchMySIMs = async () => {
    try {
      const res = await getMySIMs();
      setSims(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createSIM(data);
      alert("SIM activated!");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const handleSuspend = async (id) => {
    try {
      await suspendSIM(id);
      fetchMySIMs();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  // 👑 Admin suspend using input
  const handleAdminSuspend = async () => {
    try {
      await suspendSIM(simId);
      alert("SIM suspended successfully");
      setSimId("");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div>
      <h1>SIM Management</h1>

      {/* 👤 Customer view */}
      {role === "customer" && (
        sims.length === 0 ? (
          <p>No SIMs found</p>
        ) : (
          sims.map((sim) => (
            <SIMCard
              key={sim.id}
              sim={sim}
              role={role}
              onSuspend={handleSuspend}
            />
          ))
        )
      )}

      {/* 🧑‍💼 Agent view */}
      {role === "agent" && (
        <>
          <h2>Activate SIM</h2>
          <SIMForm onSubmit={handleCreate} />
        </>
      )}

      {/* 👑 Admin view */}
      {role === "admin" && (
        <>
          <h2>Suspend SIM</h2>

          <input
            placeholder="Enter SIM ID"
            value={simId}
            onChange={(e) => setSimId(e.target.value)}
          />

          <button onClick={handleAdminSuspend} disabled={!simId}>
            Suspend SIM
          </button>
        </>
      )}
    </div>
  );
}