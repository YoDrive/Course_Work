import axiosInstance from "../instance";
import { AxiosResponse } from 'axios'
import {AuthResponse} from "../models/Auth/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>('/login', {email, password});
    }

    static async registration(email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>('/registration', {email, password});
    }

    static async logout() : Promise<void> {
        return axiosInstance.post('/logout');
    }
}