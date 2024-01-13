import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {UserModel} from "../models/User/UserModel";
import {UserUpdateModel} from "../models/User/UserUpdateModel";
import { UserPhoto } from "../models/User/UserModel";

export default class UserService {
    static async UserUpdateInfo(userData: UserUpdateModel): Promise<AxiosResponse<UserModel>> {
        return axiosInstance.put<UserModel>(`/api/User/UpdateUserInfo`, userData);
    }
    static async updateUserPhoto(userId: number, data: FormData): Promise<AxiosResponse<UserPhoto>> {
        return axiosInstance.put<UserPhoto>(`/api/User/UpdateUserPhoto/${userId}`, data);
    }
}