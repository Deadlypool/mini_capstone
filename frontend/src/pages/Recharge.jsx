import { useEffect, useState } from "react";
import { getMySIMs } from "../api/simApi";
import { getPlans } from "../api/planApi";
import { rechargeSIM, getRechargeHistory } from "../api/rechargeApi";

import SIMSelector from "../components/SIMSelector";
import PlanSelector from "../components/PlanSelector";
import RechargeHistory from "../components/RechargeHistory";

export default function Recharge() {
  const [sims, setSims] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedSIM, setSelectedSIM] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const simRes = await getMySIMs();
      const planRes = await getPlans();
      const historyRes = await getRechargeHistory();

      setSims(simRes.data);
      setPlans(planRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecharge = async () => {
    if (!selectedSIM || !selectedPlan) {
      alert("Select SIM and Plan");
      return;
    }

    try {
      await rechargeSIM({
        sim_id: selectedSIM,
        plan_id: selectedPlan,
      });

      alert("Recharge successful!");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <main className="page-shell page-stack">
      <section className="page-header">
        <div>
          <span className="hero-kicker">Quick recharge</span>
          <h1 className="page-title">Recharge</h1>
          <p className="page-subtitle">
            Choose an active SIM, select a plan, and review recent top-ups in the same flow.
          </p>
        </div>
        <div className="hero-stat">
          <strong>{history.length}</strong>
          <span>Recent records</span>
        </div>
      </section>

      <section className="content-grid content-grid--two">
        <div className="page-stack">
          <section className="card">
            <SIMSelector
              sims={sims}
              selectedSIM={selectedSIM}
              setSelectedSIM={setSelectedSIM}
            />
          </section>

          <section className="card">
            <PlanSelector
              plans={plans}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          </section>
        </div>

        <section className="card">
          <div className="panel-header">
            <div>
              <h2 className="card-title">Complete recharge</h2>
              <p className="card-subtitle">
                Confirm your SIM and plan selection before creating the recharge request.
              </p>
            </div>
            <span className="badge">
              {selectedSIM && selectedPlan ? "Ready" : "Pending"}
            </span>
          </div>

          <div className="app-card-list">
            <div className="data-point">
              <span className="data-point-label">Selected SIM</span>
              <span className="data-point-value">{selectedSIM || "Choose a SIM"}</span>
            </div>
            <div className="data-point">
              <span className="data-point-label">Selected plan</span>
              <span className="data-point-value">{selectedPlan || "Choose a plan"}</span>
            </div>
          </div>

          <div className="form-actions mt-18">
            <button type="button" className="btn btn-primary" onClick={handleRecharge}>
              Recharge
            </button>
          </div>
        </section>
      </section>

      <section className="card">
        <RechargeHistory history={history} />
      </section>
    </main>
  );
}
