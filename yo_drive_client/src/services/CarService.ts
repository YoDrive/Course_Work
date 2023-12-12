import {AxiosResponse} from "axios/index";
import axiosInstance from "../instance";
import {CarViewModel} from "../models/Booking/CarBookingModel";

export default class CarService {
    static async DeleteCar(carId: number): Promise<AxiosResponse<boolean>> {
        return axiosInstance.delete<boolean>(`/api/car/deleteCar/${carId}`);
    }

    static async getAllCars() : Promise<AxiosResponse<CarViewModel[]>> {
        return axiosInstance.get<CarViewModel[]>('api/car/getCars');
    }

    static async getCarById(carId: number) : Promise<AxiosResponse<CarViewModel>> {
        return axiosInstance.get<CarViewModel>(`api/car/getCar/${carId}`);
    }
}

export async function fetchCars() {
    try {
        const response = await axiosInstance.get<CarViewModel[]>('/api/car/getCars');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка сервера.');
    }
}