import axiosInstance from "../instance";
import { AxiosResponse } from 'axios'
import {AuthResponse} from "../models/Auth/AuthResponse";
import {RegistrationModel} from "../models/Auth/Registration.model";

export default class AuthService {
    static async login(email: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>('/api/Auth/login', {email, password});
    }

    static async registration(data: RegistrationModel) : Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>('/api/Auth/register', data);
    }

    static async logout() : Promise<void> {
        return axiosInstance.post('/logout');
    }
}