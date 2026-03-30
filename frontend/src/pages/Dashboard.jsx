import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}