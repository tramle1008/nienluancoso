// .../api/.../api.js
import axios from "axios";
import { getAuthToken } from "../utils/auth";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();

    if (token && !config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
