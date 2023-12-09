import axiosInstance from "../instance";
import { AxiosResponse } from 'axios'
import {CarBookingModel} from "../models/Booking/CarBookingModel";
import {BookingAdd} from "../models/Booking/BookingAddModel";
import {BookingResponseModel} from "../models/Booking/BookingResponseModel";
import {CarSwiperModel} from "../models/Swiper/CarSwiperModel";

export default class BookingService {
    static async getAllCars() : Promise<AxiosResponse<CarBookingModel[]>> {
        return axiosInstance.get<CarBookingModel[]>('api/car/getCars');
    }
    static async getAutopark() : Promise<AxiosResponse<CarSwiperModel[]>> {
        return axiosInstance.get<CarSwiperModel[]>('api/car/getAutopark');
    }
    static async booking(request: BookingAdd) : Promise<AxiosResponse<BookingResponseModel>> {
        return axiosInstance.post<BookingResponseModel>('api/rent/createRent', request);
    }
}