import api from "../api/axiosClient";

// 1) Register User
export const registerUser = (payload) => api.post("/v1/users/", payload);

// 2) Verify OTP
export const verifyOtp = (userId, payload) => api.post(`/v1/users/${userId}/verify-otp/`, payload);

// 3) Login
export const loginUser = (payload) => api.post("/v1/users/login/", payload);

// 4) Create Doctor
export const createDoctor = (payload) => api.post("/v1/doctors/", payload);
