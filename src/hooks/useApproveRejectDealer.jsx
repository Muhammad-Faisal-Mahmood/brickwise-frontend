import axiosInstance from "../api/axiosInstance";

export const approveDealer = async (id) => {
  return axiosInstance.post(`/admin/dealers/${id}/approved`);
};

export const rejectDealer = async (id) => {
  return axiosInstance.post(`/admin/dealers/${id}/rejected`);
};
