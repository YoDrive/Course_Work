import {AxiosResponse} from "axios/index";
import axiosInstance from "../instance";
import {CarBookingModel} from "../models/Booking/CarBookingModel";

export default class CarService {
    static async DeleteCar(carId: number): Promise<AxiosResponse<boolean>> {
        return axiosInstance.delete<boolean>(`/api/car/deleteCar/${carId}`);
    }

    static async getAllCars() : Promise<AxiosResponse<CarBookingModel[]>> {
        return axiosInstance.get<CarBookingModel[]>('api/car/getCars');
    }
}

export async function fetchCars() {
    try {
        const response = await axiosInstance.get<CarBookingModel[]>('/api/car/getCars');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка сервера.');
    }
}