import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {BookingResponseModel} from "../models/Booking/BookingResponseModel";

export default class RentService {
    static async GetUserRents(userId: number): Promise<AxiosResponse<BookingResponseModel[]>> {
        return axiosInstance.get<BookingResponseModel[]>(`/api/rent/getUserRents/${userId}`);
    }
}