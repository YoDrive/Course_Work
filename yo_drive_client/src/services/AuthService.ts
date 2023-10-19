import axiosInstance from "../instance";
import { AxiosResponse } from 'axios'
import {AuthResponse} from "../models/Auth/AuthResponse";
import {RegistrationModel} from "../models/Auth/Registration.model";
import {User} from "../models/Auth/User.model";

export default class AuthService {
    static async login(user: User) : Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>('/api/Auth/login', user);
    }

    static async registration(data: RegistrationModel) : Promise<AxiosResponse<AuthResponse>> {
        return axiosInstance.post<AuthResponse>('/api/Auth/register', data);
    }

    static async logout() : Promise<void> {
        return axiosInstance.post('/logout');
    }
}