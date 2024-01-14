import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {UserModel, UserUpdatePhotoModel} from "../models/User/UserModel";
import {UserUpdateModel} from "../models/User/UserUpdateModel";

export default class UserService {
    static async UserUpdateInfo(userData: UserUpdateModel): Promise<AxiosResponse<UserModel>> {
        return axiosInstance.put<UserModel>(`/api/User/UpdateUserInfo`, userData);
    }

    static async updateUserPhoto(data: UserUpdatePhotoModel): Promise<AxiosResponse<UserUpdatePhotoModel>> {
        try {
            return axiosInstance.put<UserUpdatePhotoModel>(`/api/User/UpdateUserPhoto`, data);
        } catch (error) {
            console.error('Error updating photo:', error);
            throw error;
        }
    }
}