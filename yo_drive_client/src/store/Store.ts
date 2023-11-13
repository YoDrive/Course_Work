import {User, UserAuth} from "../models/Auth/User.model";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/Auth/AuthResponse";
import { API_URL } from "../instance";
import {RegistrationModel} from "../models/Auth/Registration.model";

export default class Store {
    user = {} as UserAuth;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: UserAuth) {
        this.user = user;
    }

    async login(user: User) {
        try {
            const response = await AuthService.login(user);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (error: any) {
            throw new Error("Неверный логин или пароль.");
        }
    }

    async registration(data: RegistrationModel) {
        try {
            const response = await AuthService.registration(data);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async logout(email: string, password: string) {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as UserAuth);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    isAdmin() {
        return this.isAuth && this.user.roleName === 'admin';
    }
}