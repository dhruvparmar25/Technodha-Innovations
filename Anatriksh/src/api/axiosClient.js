import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

// Routes that should not receive Authorization token
const PUBLIC_ROUTES = [
    "/v1/users/",
    "/v1/users/login/",
    "/v1/users/forgot-password/",
    "/v1/users/reset-password/",
];

api.interceptors.request.use((config) => {
    const isPublic = PUBLIC_ROUTES.some((route) => config.url.startsWith(route));

    // Attach token only for protected routes
    if (!isPublic) {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
