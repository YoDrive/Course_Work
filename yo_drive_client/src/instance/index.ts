import axios from "axios";
import {AuthResponse} from "../models/Auth/AuthResponse";

export const API_URL = 'http://localhost:5083'

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

axiosInstance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return axiosInstance.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }
})

export default axiosInstance;