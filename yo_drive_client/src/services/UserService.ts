import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {UserModel} from "../models/User/UserModel";
import {UserUpdateModel} from "../models/User/UserUpdateModel";

export default class UserService {
    static async UserUpdateInfo(userData: UserUpdateModel): Promise<AxiosResponse<UserModel>> {
        return axiosInstance.put<UserModel>(`/api/User/UpdateUserInfo`, userData);
    }
}