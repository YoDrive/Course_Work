import {AxiosResponse, Axios} from "axios/index";
import axiosInstance from "../instance";
import {CarBrand, CarClass, CarViewModel, Filial} from "../models/Booking/CarBookingModel";
import { CarAdd, CarModel } from "../models/Add/Add.model";

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
    static async createCar(data: CarAdd) : Promise<AxiosResponse<CarAdd>> {
        return axiosInstance.post<CarAdd>('/api/Car/CreateCar', data);
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
export async function getCarBrands(){
    try {
        const response = await axiosInstance.get<CarBrand[]>('api/CarBrand/GetBrands');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка сервера.');
    }
}
export async function getCarModels(){
    try {
        const response = await axiosInstance.get<CarModel[]>('api/CarModel/GetAllModels');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка сервера.');
    }
}

export async function getCarClasses(){
    try {
        const response = await axiosInstance.get<CarClass[]>('api/CarClass/GetClasses');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка сервера.');
    }
}

export async function getCarFilials(){
    try {
        const response = await axiosInstance.get<Filial[]>('api/Filial/GetFilials');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка сервера.');
    }
}
  