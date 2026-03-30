import axiosInstance from "./axiosInstance";

// Agent → activate SIM
export const createSIM = (data) =>
  axiosInstance.post("/sims", data);

// Customer → get own sims
export const getMySIMs = () =>
  axiosInstance.get("/sims/my");

// Admin → suspend SIM
export const suspendSIM = (id) =>
  axiosInstance.put(`/sims/${id}`);