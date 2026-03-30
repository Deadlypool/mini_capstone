import { useEffect, useState, useContext } from "react";
import { getPlans, createPlan, updatePlan, deletePlan } from "../api/planApi";
import PlanCard from "../components/PlanCard";
import PlanForm from "../components/PlanForm";
import { AuthContext } from "../context/AuthContext";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await getPlans();
    setPlans(res.data);
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (selectedPlan) {
        await updatePlan(selectedPlan.id, data);
      } else {
        await createPlan(data);
      }

      setSelectedPlan(null);
      fetchPlans();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const handleDelete = async (id) => {
    await deletePlan(id);
    fetchPlans();
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
  };

  const clearEdit = () => setSelectedPlan(null);

  return (
    <div>
      <h1>Plans</h1>

      {/* 👑 Admin Form */}
      {isAdmin && (
        <PlanForm
          onSubmit={handleCreateOrUpdate}
          selectedPlan={selectedPlan}
          clearEdit={clearEdit}
        />
      )}

      {/* Plans List */}
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}