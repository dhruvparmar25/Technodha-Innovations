import api from "../api/axiosClient";

// Register user
export const registerUser = (payload) => api.post("/v1/users/", payload);

// Verify OTP
export const verifyOtp = (userId, payload) => api.post(`/v1/users/${userId}/verify-otp/`, payload);

// Login user and get tokens
export const loginUser = (payload) => api.post("/v1/users/login/", payload);

// Create doctor (requires auth token)
export const createDoctor = (payload) => api.post("/v1/doctors/", payload);
