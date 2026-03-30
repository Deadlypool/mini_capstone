import axiosInstance from "./axiosInstance";

export const getPlans = () => axiosInstance.get("/plans");

export const createPlan = (data) =>
  axiosInstance.post("/plans", data);

export const updatePlan = (id, data) =>
  axiosInstance.put(`/plans/${id}`, data);

export const deletePlan = (id) =>
  axiosInstance.delete(`/plans/${id}`);