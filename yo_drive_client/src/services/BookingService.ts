import axiosInstance from "../instance";
import { AxiosResponse } from 'axios'
import {CarBookingModel} from "../models/Booking/CarBookingModel";
import {BookingAdd} from "../models/Booking/BookingAddModel";
import {BookingResponseModel} from "../models/Booking/BookingResponseModel";

export default class BookingService {
    static async getAllCars() : Promise<AxiosResponse<CarBookingModel[]>> {
        return axiosInstance.get<CarBookingModel[]>('api/car/getCars');
    }

    static async booking(request: BookingAdd) : Promise<AxiosResponse<BookingResponseModel>> {
        return axiosInstance.post<BookingResponseModel>('api/rent/createRent', request);
    }
}