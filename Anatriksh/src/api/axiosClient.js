import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

// Public APIs where token must NOT be added
const PUBLIC_ROUTES = [
    "/v1/users/", // register
    "/v1/users/login/", // login
    "/v1/users/", // OTP verify also inside this
    "/v1/users/forgot-password/",
    "/v1/users/reset-password/",
];

api.interceptors.request.use((config) => {
    // If request starts with any public route → do NOT attach token
    const isPublic = PUBLIC_ROUTES.some((route) => config.url.startsWith(route));

    if (!isPublic) {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
