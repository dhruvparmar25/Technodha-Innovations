// Create main API client
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

// Routes without token
const PUBLIC_ROUTES = [
    "/v1/users/",
    "/v1/users/login/",
    "/v1/users/forgot-password/",
    "/v1/users/reset-password/",
];

// Add token to protected routes
api.interceptors.request.use((config) => {
    const isPublic = PUBLIC_ROUTES.some((r) => config.url.startsWith(r));

    if (!isPublic) {
        const token = localStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auto logout only for protected API 401 (NOT on login)
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const status = err.response?.status;
        const url = err.config?.url;

        // Skip logout for login API
        const isLoginRoute = url.includes("/v1/users/login/");

        if (status === 401 && !isLoginRoute) {
            localStorage.clear();
            window.location.href = "/login";
        }

        return Promise.reject(err);
    }
);

export default api;
