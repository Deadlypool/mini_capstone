import { useEffect, useState } from "react";
import { getMySIMs } from "../api/simApi";
import { getPlans } from "../api/planApi";
import { rechargeSIM } from "../api/rechargeApi";

import SIMSelector from "../components/SIMSelector";
import PlanSelector from "../components/PlanSelector";

import { getRechargeHistory } from "../api/rechargeApi";
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
    <div>
      <h1>Recharge</h1>

      <SIMSelector
        sims={sims}
        selectedSIM={selectedSIM}
        setSelectedSIM={setSelectedSIM}
      />

      <PlanSelector
        plans={plans}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />

      <button onClick={handleRecharge}>
        Recharge
      </button>
      <br></br>
      <br></br>

      <RechargeHistory history={history} />
    </div>
  );
}