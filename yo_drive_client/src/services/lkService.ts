import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {UserModel, UserPhoto} from "../models/User/UserModel";

export default class LkService {
    static async GetUserData(userId: number): Promise<AxiosResponse<UserModel>> {
        return axiosInstance.get<UserModel>(`/api/user/GetUserInfo/${userId}`);
    }    
}