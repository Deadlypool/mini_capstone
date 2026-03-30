
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Plans from "./pages/Plans";
import Sims from "./pages/Sims";
import Recharge from "./pages/Recharge";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />
        <Route
  path="/sims"
  element={
    <ProtectedRoute>
      <Sims />
    </ProtectedRoute>
  }
/>
        <Route
  path="/recharge"
  element={
    <ProtectedRoute>
      <Recharge />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;