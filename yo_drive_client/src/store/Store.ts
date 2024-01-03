import { User, UserAuth } from "../models/Auth/User.model";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { API_URL } from "../instance";
import { RegistrationModel } from "../models/Auth/Registration.model";

export default class Store {
    user = {} as UserAuth;
    isAuth: boolean | undefined;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = this.decodeToken(token);
            if (decodedToken) {
                this.isAuth = true;
                this.setUser(decodedToken);
            }
        }
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: UserAuth) {
        this.user = user;
    }

    decodeToken(token: string): UserAuth | null {
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson) as UserAuth;
            return payload;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    async login(user: User) {
        try {
            const response = await AuthService.login(user);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
        } catch (error: any) {
            throw new Error("Неверный логин или пароль.");
        }
    }

    async registration(data: RegistrationModel) {
        try {
            const response = await AuthService.registration(data);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as UserAuth);
            this.setUser(Object.assign({}, {} as UserAuth));
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        return this.isAuth;
    }

    isAdmin() {
        return this.isAuth && this.user.Roles === 'admin';
    }
}