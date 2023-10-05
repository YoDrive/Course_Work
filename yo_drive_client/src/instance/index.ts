import axios from "axios";

export const API_URL = 'http://localhost:5083'

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default axiosInstance;