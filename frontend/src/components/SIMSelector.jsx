export default function SIMSelector({ sims, selectedSIM, setSelectedSIM }) {
  return (
    <div>
      <h3>Select SIM</h3>

      {sims.map((sim) => (
        <div key={sim.id}>
          <input
            type="radio"
            name="sim"
            value={sim.id}
            onChange={() => setSelectedSIM(sim.id)}
          />
          {sim.mobile_number} ({sim.status})
        </div>
      ))}
    </div>
  );
}