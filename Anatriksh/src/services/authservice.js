// Auth API calls
import api from "../api/axiosClient";

// Register user
export const registerUser = (payload) => api.post("/v1/users/", payload);

// Verify OTP
export const verifyOtp = (userId, payload) => api.post(`/v1/users/${userId}/verify-otp/`, payload);

// Login user
export const loginUser = (payload) => api.post("/v1/users/login/", payload);

// Create doctor profile
export const createDoctor = (payload) => api.post("/v1/doctors/", payload);
