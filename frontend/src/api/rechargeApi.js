import axiosInstance from "./axiosInstance";

export const rechargeSIM = (data) =>
  axiosInstance.post("/recharge", data);

export const getRechargeHistory = () =>
  axiosInstance.get("/recharge/history");