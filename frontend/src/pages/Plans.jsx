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
    <main className="page-shell page-stack">
      <section className="page-header">
        <div>
          <span className="hero-kicker">Plan catalog</span>
          <h1 className="page-title">Plans</h1>
          <p className="page-subtitle">
            Browse available offers and manage the plan catalog from one place.
          </p>
        </div>
        <div className="hero-stat">
          <strong>{plans.length}</strong>
          <span>Plans available</span>
        </div>
      </section>

      {isAdmin && (
        <section className="card">
          <div className="panel-header">
            <div>
              <h2 className="card-title">
                {selectedPlan ? "Update plan" : "Create a new plan"}
              </h2>
              <p className="card-subtitle">
                Add pricing, validity, and service details for customer-facing offers.
              </p>
            </div>
            <span className="badge">{selectedPlan ? "Editing" : "Admin"}</span>
          </div>

          <PlanForm
            onSubmit={handleCreateOrUpdate}
            selectedPlan={selectedPlan}
            clearEdit={clearEdit}
          />
        </section>
      )}

      <section className="card">
        <div className="panel-header">
          <div>
            <h2 className="card-title">Available plans</h2>
            <p className="card-subtitle">
              A polished overview of current prices, validity, and benefits.
            </p>
          </div>
          <span className="badge">{plans.length}</span>
        </div>

        {plans.length === 0 ? (
          <div className="empty-state">No plans available yet.</div>
        ) : (
          <div className="app-card-list">
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
        )}
      </section>
    </main>
  );
}
